# runtime-requirements

What a service must do to run on Prisma Compute, and the platform limits it must design around.

## Priority

CRITICAL

## Why It Matters

A deploy can converge cleanly and still serve nothing: a loopback listener is unreachable, a slow handler gets a `504` from the ingress, and a sleeping instance stops background work. None of these show up as deploy errors.

## Runtime

- Services run on **Bun**, in a VM next to their Prisma Postgres database. Write server code for Bun, and bundle with `bun build --target=bun` or another bundler that inlines all dependencies. A build that leaves packages as imports needs `dependencies: "external"` on `node()` (Composer 0.29.0 and later).
- There is no global `Temporal`. A service that reads Prisma ORM `DateTime` columns as `Temporal` values compiles, deploys, then fails on the first read. Import a polyfill at the server entry or use string column types.

## Host and Port

- Listen on `service.port()` (default 3000). The runtime also exports it as `PORT`.
- Bind `0.0.0.0`. Compute routes external HTTP to the VM; a `localhost` or `127.0.0.1` listener looks started but is unreachable.

```ts
Bun.serve({ port: service.port(), hostname: "0.0.0.0", fetch: handler });
```

## 60 Seconds to First Byte

The ingress gives a request 60 seconds to start responding. If nothing comes back, the client gets `504 Gateway Time-out` (a short `openresty` HTML body) and Compute cancels the request. Your handler sees only its abort signal (`req.signal`); no error is logged.

- Respond within 60 seconds. For webhooks, return `200` or `202` before processing.
- Keep in-request timeouts (fetch timeouts, `AbortSignal.timeout`) under 60 seconds so your own error handling runs first.
- Continue longer work after the response with `waitUntil`, or persist a job and process it in steps from a separate trigger. Compute does not run scheduled jobs; the trigger is an external scheduler or the Composer `cron` module.
- The deadline covers only the first bytes. The docs say a response that has started is not cut off; the `prisma-composer-core-concepts` skill warns that the ingress buffers streamed responses. Send the first bytes early and test a streaming route on a stage before relying on it.

## Sleep and Keep-Awake

Idle instances scale to zero: the platform snapshots memory and resumes from it on the next request. Requests are unaffected, but `setTimeout`, `setInterval`, and floating promises can stall mid-flight. Do not build schedulers on `setInterval` inside a service.

`@prisma/compute` keeps an instance awake on a best-effort basis:

```ts
import { KeepAwakeGuard, waitUntil } from "@prisma/compute";

waitUntil(processJob(job), { signal: AbortSignal.timeout(10 * 60_000) });

async function processBatch() {
  using guard = new KeepAwakeGuard({ signal: AbortSignal.timeout(30_000) });
  await doWork();
}
```

- The `signal` caps how long the instance stays awake; it does not cancel the work.
- Release a manually created guard in `finally` with `guard.release()` where `using` is unavailable.
- Neither primitive makes work durable, retries it, or carries it through a restart or a new deployment.

## Connections

Scale to zero closes idle database connections. A long-lived client that treats a dropped connection as fatal crash-loops through `502`s. Keep pools small and reconnect-friendly, and log instead of exiting:

```ts
const sql = new SQL({ url: db.url, max: 1, idleTimeout: 10 });
process.on("uncaughtException", (err) => console.error("uncaughtException", err));
process.on("unhandledRejection", (err) => console.error("unhandledRejection", err));
```

A call into a sleeping service can get `ECONNRESET` during the cold start; retry it. The generated Composer RPC client already does.

## Limits

- No WebSocket servers.
- No persistent filesystem.
- No multi-region deployments. Each service runs in one region, and a Composer deploy uses the project's region, fixed when the first deploy creates the project: `us-east-1`, `us-west-1`, `eu-west-3`, `eu-central-1`, `ap-northeast-1`, or `ap-southeast-1`.
- A deployed `/rpc/<method>` of a Composer contract returns `401` to anything except the services wired to it. That is the service-key check, not a broken deploy.

## Bad

```ts
app.post("/webhook", async (c) => {
  await processForTwoMinutes(await c.req.json());
  return c.text("done");
});
```

The caller gets a `504` after 60 seconds, and the instance can sleep while the work continues.

## Good

```ts
app.post("/webhook", async (c) => {
  const job = await c.req.json();
  waitUntil(processForTwoMinutes(job), { signal: AbortSignal.timeout(5 * 60_000) });
  return c.body(null, 202);
});
```

## References

- [Request timeout](https://www.prisma.io/docs/compute/request-timeout)
- [Keeping instances awake](https://www.prisma.io/docs/compute/keeping-instances-awake)
- [Known limitations](https://www.prisma.io/docs/compute/limitations)
