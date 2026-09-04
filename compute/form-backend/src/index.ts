import { serve } from "@hono/node-server";

import service from "./service.ts";
import { app } from "./app.tsx";

// Compute scales to zero; a dropped database socket must not take the process
// down with it. Log and keep serving instead.
process.on("uncaughtException", (error) => {
  console.error("uncaughtException:", error);
});
process.on("unhandledRejection", (reason) => {
  console.error("unhandledRejection:", reason);
});

/**
 * The reserved port Composer routes to. Falls back to `PORT` (and then 3000)
 * so `bun run dev` works outside Composer too.
 */
function resolvePort(): number {
  try {
    const reserved = service.port();
    if (Number.isInteger(reserved) && reserved > 0 && reserved <= 65535) return reserved;
  } catch {
    // Not booted through Composer — fall through to PORT.
  }

  const raw = (process.env.PORT ?? "").trim();
  const parsed = raw.length > 0 ? Number(raw) : Number.NaN;
  return Number.isInteger(parsed) && parsed > 0 && parsed <= 65535 ? parsed : 3000;
}

const port = resolvePort();

// Bind every interface: Compute routes external HTTP to the VM, so a
// loopback-only listener is unreachable.
serve({ fetch: app.fetch, port, hostname: "0.0.0.0" });

console.log(`Form Backend listening on http://0.0.0.0:${port}`);
