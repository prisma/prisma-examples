import type { Context } from "hono";

/**
 * The origin a browser should post to — proxy headers first, since Compute
 * terminates TLS in front of the service.
 */
export function publicOrigin(c: Context): string {
  const url = new URL(c.req.url);
  const proto =
    c.req.header("x-forwarded-proto")?.split(",")[0]?.trim() ?? url.protocol.replace(":", "");
  const host = c.req.header("x-forwarded-host") ?? c.req.header("host") ?? url.host;
  return `${proto}://${host}`;
}
