import { createHmac, timingSafeEqual } from "node:crypto";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

import service from "../service.ts";

export const SESSION_COOKIE = "form_backend_session";

/**
 * The session cookie is `<expiresAt>.<hmac>`, where the HMAC-SHA256 covers this
 * constant plus the expiry and is keyed by the admin password. Rotating the
 * password invalidates every session; the expiry is enforced server-side, so a
 * copied cookie stops working after `SESSION_TTL_SECONDS` regardless of
 * whether the client honours `Max-Age`.
 */
const SESSION_SUBJECT = "form-backend/admin/v1";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

/** `prisma-composer dev` mints this prefix when a secret is unset in the shell. */
const LOCAL_PLACEHOLDER_PREFIX = "local-placeholder-";

let resolved: { value: string | undefined } | undefined;

function resolveAdminPassword(): string | undefined {
  let fromInput: string | undefined;
  try {
    fromInput = service.input().adminPassword.expose();
  } catch {
    // Not running under Composer (or ADMIN_PASSWORD was never bound).
    fromInput = undefined;
  }
  const value = (fromInput ?? process.env.ADMIN_PASSWORD ?? "").trim();

  // A minted placeholder means nobody set the secret — treat that as "unset"
  // rather than shipping a dashboard behind a password no one knows.
  if (value.length === 0 || value.startsWith(LOCAL_PLACEHOLDER_PREFIX)) return undefined;
  return value;
}

/**
 * The configured admin password, or `undefined` when none is set — in which
 * case the dashboard is disabled rather than falling back to a default.
 */
export function adminPassword(): string | undefined {
  resolved ??= { value: resolveAdminPassword() };
  return resolved.value;
}

export function adminEnabled(): boolean {
  return adminPassword() !== undefined;
}

function sign(password: string, payload: string): string {
  return createHmac("sha256", password).update(payload).digest("hex");
}

function sessionToken(password: string, expiresAt: number): string {
  return `${expiresAt}.${sign(password, `${SESSION_SUBJECT}:${expiresAt}`)}`;
}

/** Constant-time comparison of two equal-length hex digests. */
function digestsMatch(a: string, b: string): boolean {
  const left = Buffer.from(a, "utf8");
  const right = Buffer.from(b, "utf8");
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

/** Compare a submitted password to the configured one without leaking length. */
export function passwordMatches(candidate: string): boolean {
  const password = adminPassword();
  if (password === undefined) return false;
  return digestsMatch(sign(candidate, SESSION_SUBJECT), sign(password, SESSION_SUBJECT));
}

export function startSession(c: Context): void {
  const password = adminPassword();
  if (password === undefined) return;
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  setCookie(c, SESSION_COOKIE, sessionToken(password, expiresAt), {
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
    secure: new URL(c.req.url).protocol === "https:",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export function endSession(c: Context): void {
  deleteCookie(c, SESSION_COOKIE, { path: "/" });
}

export function isSignedIn(c: Context): boolean {
  const password = adminPassword();
  if (password === undefined) return false;
  const cookie = getCookie(c, SESSION_COOKIE);
  if (!cookie) return false;

  const separator = cookie.indexOf(".");
  if (separator === -1) return false;
  const expiresAt = Number(cookie.slice(0, separator));
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false;

  return digestsMatch(cookie, sessionToken(password, expiresAt));
}
