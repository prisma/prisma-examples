import type { Context } from "hono";

/** Hard cap on an accepted submission body. */
export const MAX_BODY_BYTES = 50 * 1024;

/** Field name that acts as a honeypot: filled in means "bot". */
export const HONEYPOT_FIELD = "_gotcha";

export type PayloadValue = string | string[];
export type Payload = Record<string, PayloadValue>;

export type ParsedBody =
  | { ok: true; payload: Payload; honeypot: boolean; wantsJson: boolean }
  | { ok: false; status: 400 | 413 | 415; message: string; wantsJson: boolean };

function contentType(c: Context): string {
  return (c.req.header("content-type") ?? "").toLowerCase();
}

/** JSON clients get `{ ok: true }`; browsers posting a `<form>` get HTML. */
function prefersJson(c: Context): boolean {
  if (contentType(c).includes("application/json")) return true;
  const accept = (c.req.header("accept") ?? "").toLowerCase();
  return accept.includes("application/json") && !accept.includes("text/html");
}

/** Read the raw body, aborting as soon as it exceeds `max` bytes. */
/**
 * Read at most `max` bytes of the body. Returns `null` once the cap is
 * exceeded so callers can answer 413 without buffering the rest. This runs
 * before any parser, so a chunked or mis-declared `Content-Length` can't
 * smuggle a large body past the limit.
 */
async function readCappedBytes(
  request: Request,
  max: number,
): Promise<Uint8Array<ArrayBuffer> | null> {
  const body = request.body;
  if (!body) return new Uint8Array(new ArrayBuffer(0));

  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    total += value.byteLength;
    if (total > max) {
      await reader.cancel().catch(() => undefined);
      return null;
    }
    chunks.push(value);
  }

  const joined = Buffer.concat(chunks);
  const out = new Uint8Array(new ArrayBuffer(joined.byteLength));
  out.set(joined);
  return out;
}

async function readCappedText(request: Request, max: number): Promise<string | null> {
  const bytes = await readCappedBytes(request, max);
  return bytes === null ? null : new TextDecoder().decode(bytes);
}

function stringifyJsonValue(value: unknown): PayloadValue {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) {
    return value.map((item) => {
      const rendered = stringifyJsonValue(item);
      return Array.isArray(rendered) ? JSON.stringify(item) : rendered;
    });
  }
  return JSON.stringify(value);
}

function collect(entries: Iterable<readonly [string, string]>): Payload {
  const payload: Payload = {};
  for (const [key, value] of entries) {
    const existing = payload[key];
    if (existing === undefined) {
      payload[key] = value;
    } else if (Array.isArray(existing)) {
      existing.push(value);
    } else {
      payload[key] = [existing, value];
    }
  }
  return payload;
}

/** `_gotcha` — and any other underscore-prefixed control field — never gets stored. */
function stripControlFields(payload: Payload): Payload {
  const cleaned: Payload = {};
  for (const [key, value] of Object.entries(payload)) {
    if (key.startsWith("_")) continue;
    cleaned[key] = value;
  }
  return cleaned;
}

function honeypotTripped(payload: Payload): boolean {
  const value = payload[HONEYPOT_FIELD];
  if (value === undefined) return false;
  const values = Array.isArray(value) ? value : [value];
  return values.some((entry) => entry.trim().length > 0);
}

/**
 * Parse a submission body from JSON, urlencoded, or multipart (fields only).
 * Returns the payload with control fields stripped, plus whether the honeypot
 * was tripped and whether the caller wants a JSON response.
 */
export async function parseSubmissionBody(c: Context): Promise<ParsedBody> {
  const wantsJson = prefersJson(c);
  const type = contentType(c);

  const declaredLength = Number(c.req.header("content-length") ?? "");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return { ok: false, status: 413, message: "Submission too large.", wantsJson };
  }

  let raw: Payload;

  if (type.includes("application/json")) {
    const text = await readCappedText(c.req.raw, MAX_BODY_BYTES);
    if (text === null) {
      return { ok: false, status: 413, message: "Submission too large.", wantsJson };
    }
    let parsed: unknown;
    try {
      parsed = text.trim().length === 0 ? {} : JSON.parse(text);
    } catch {
      return { ok: false, status: 400, message: "Body is not valid JSON.", wantsJson };
    }
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return { ok: false, status: 400, message: "JSON body must be an object.", wantsJson };
    }
    raw = {};
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      raw[key] = stringifyJsonValue(value);
    }
  } else if (type.includes("application/x-www-form-urlencoded")) {
    const text = await readCappedText(c.req.raw, MAX_BODY_BYTES);
    if (text === null) {
      return { ok: false, status: 413, message: "Submission too large.", wantsJson };
    }
    raw = collect(new URLSearchParams(text));
  } else if (type.includes("multipart/form-data")) {
    // Cap the raw bytes first, then hand the bounded body to the multipart parser.
    const bytes = await readCappedBytes(c.req.raw, MAX_BODY_BYTES);
    if (bytes === null) {
      return { ok: false, status: 413, message: "Submission too large.", wantsJson };
    }
    let form: FormData;
    try {
      form = await new Request(c.req.url, {
        method: "POST",
        headers: { "content-type": c.req.header("content-type") ?? type },
        body: bytes,
      }).formData();
    } catch {
      return { ok: false, status: 400, message: "Could not parse multipart body.", wantsJson };
    }
    const entries: Array<readonly [string, string]> = [];
    for (const [key, value] of form.entries()) {
      if (typeof value !== "string") {
        return {
          ok: false,
          status: 415,
          message:
            "File uploads are not supported yet — send text fields only, or strip the file input before posting.",
          wantsJson,
        };
      }
      entries.push([key, value]);
    }
    raw = collect(entries);
  } else {
    return {
      ok: false,
      status: 415,
      message:
        "Unsupported content type. Send application/json, application/x-www-form-urlencoded, or multipart/form-data.",
      wantsJson,
    };
  }

  return {
    ok: true,
    payload: stripControlFields(raw),
    honeypot: honeypotTripped(raw),
    wantsJson,
  };
}

/** Render a stored submission's JSON blob back into ordered key/value pairs. */
export function decodeSubmissionData(data: string): Array<[string, string]> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(data);
  } catch {
    return [["(raw)", data]];
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return [["(raw)", data]];
  }
  return Object.entries(parsed as Record<string, unknown>).map(([key, value]) => [
    key,
    Array.isArray(value) ? value.map((item) => String(item)).join(", ") : String(value ?? ""),
  ]);
}
