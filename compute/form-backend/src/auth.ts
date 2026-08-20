import { createHmac, timingSafeEqual } from "node:crypto";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

import service from "../service.ts";

export const SESSION_COOKIE = "form_backend_session";

/**
 * The session cookie carries an HMAC-SHA256 of this constant, keyed by the
 * admin password. Rotating the password invalidates every session.
 */
const SESSION_SUBJECT = "form-backend/admin/v1";

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

function sessionToken(password: string): string {
  return createHmac("sha256", password).update(SESSION_SUBJECT).digest("hex");
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
  return digestsMatch(sessionToken(candidate), sessionToken(password));
}

export function startSession(c: Context): void {
  const password = adminPassword();
  if (password === undefined) return;
  setCookie(c, SESSION_COOKIE, sessionToken(password), {
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
    secure: new URL(c.req.url).protocol === "https:",
    maxAge: 60 * 60 * 24 * 7,
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
  return digestsMatch(cookie, sessionToken(password));
}
