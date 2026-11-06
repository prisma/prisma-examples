# app-framework-builds

Each framework deploys through a build adapter in its `service.ts` that points at the output your own build produced.

## Priority

CRITICAL

## Why It Matters

Neither `prisma deploy` nor the deploy action detects a framework or runs a build. The service declaration names the built output, and a mismatch between it and what the build writes fails at assemble time or at boot. There are no framework keys any more (`--framework nextjs` and similar belonged to the removed CLI).

## Adapters

| Adapter | Import | Use for |
|---------|--------|---------|
| `node({ module: import.meta.url, entry })` | `@prisma/composer/node` | One self-contained ESM file with every dependency inlined except runtime built-ins (`bun`, `bun:*`, `node:*`) |
| `node({ module: import.meta.url, dir, entry })` | `@prisma/composer/node` | A built directory copied as-is; `entry` is a file inside `dir` |
| `nextjs({ module: import.meta.url, appDir })` | `@prisma/composer/nextjs` | A Next.js app built with `output: "standalone"`; add `nextjsBuild()` to the `composer` extensions |
| `dependencies: "external"` on either `node()` form | `@prisma/composer/node` | A build that leaves packages as imports. The deploy traces `entry` and stages the installed packages it imports, which can take minutes. Composer 0.29.0 and later |

Paths are relative to the service module. With the default `dependencies: "bundled"`, the deploy copies only what the build produced and never ships the project's `node_modules`, for a single file and for a `dir` build alike, so a package left as an import fails at boot with `Cannot find package`. Bundle it, or set `dependencies: "external"`. A `dir` tree must contain no symlinks and `entry` must not leave `dir`. Two services in one package need two separate builds, one per entry.

## Per Framework

The shapes `create-prisma` 0.14.1 generates, with `service.ts` at the project root:

| Framework | Build script | `build:` in `service.ts` | Requirements |
|-----------|--------------|--------------------------|--------------|
| Hono, Elysia, NestJS, plain server | Bundle to one file (`bun build src/index.ts --target=bun --outfile dist/server.mjs`, or tsdown bundling every non-built-in dependency) | `node({ module: import.meta.url, entry: "./dist/server.mjs" })` | The entry starts the HTTP server itself |
| Next.js | `next build` | `nextjs({ module: import.meta.url, appDir: "." })` | `output: "standalone"` in `next.config.*`; `nextjsBuild()` in `prisma.config.ts` |
| Nuxt | `nuxt build` | `node({ module: import.meta.url, dir: "./.output", entry: "server/index.mjs" })` | Default Nitro Node server preset |
| TanStack Start | `vite build` | `node({ module: import.meta.url, dir: "./.output", entry: "server/index.mjs" })` | `nitro()` from `nitro/vite` in the Vite plugins |
| Astro | `astro build` | `node({ module: import.meta.url, dir: "./dist", entry: "server/entry.mjs", dependencies: "external" })` | `output: "server"`, `adapter: node({ mode: "standalone" })` from `@astrojs/node`. The adapter leaves packages as imports, so Composer 0.29.0 and later need `dependencies: "external"`; `create-prisma` 0.14.x pins Composer 0.28.0 and omits it |
| SvelteKit | `vite build` | `node({ module: import.meta.url, dir: "./build", entry: "index.js" })` | `@sveltejs/adapter-node`, with `ssr: { noExternal: true }` in `vite.config.ts` so the build inlines packages; without it, add `dependencies: "external"` |
| Turborepo | `turbo run build` | `node({ module: import.meta.url, entry: "./apps/server/dist/server.mjs" })` | One `compute()` per deployable app |

Verify the actual output path after a local build before writing `entry` or `dir`.

## Host and Port

The runtime exports the reserved port as `PORT` and sets `HOST` to `0.0.0.0` when it is unset. Code you write reads `service.port()` and binds `0.0.0.0`. Framework servers that read `PORT` themselves (Next.js standalone, Nitro, Astro's Node adapter, SvelteKit's Node adapter) work without changes. Never set `HOST` or `HOSTNAME` to `localhost` or `127.0.0.1` in deploy env.

```ts
// Elysia
app.listen({ port: service.port(), hostname: "0.0.0.0" });

// NestJS
await app.listen(service.port(), "0.0.0.0");
```

## Next.js Pages That Read the Service

A page, route handler, or server action that calls `service.load()` or `service.input()` needs `export const dynamic = "force-dynamic"`. The runtime environment does not exist at build time, and Next.js does not re-read it for prerendered routes.

## Bad

```ts
build: node({ module: import.meta.url, entry: "./src/index.ts" }),
```

The entry is source, not a self-contained build. Imports from `node_modules` fail at boot.

## Good

```ts
build: node({ module: import.meta.url, entry: "./dist/server.mjs" }),
```

with `"build": "bun build src/index.ts --target=bun --outfile dist/server.mjs"`.

## References

- [Port an existing app](https://www.prisma.io/docs/composer/porting-an-app)
- [Framework guides](https://www.prisma.io/docs/guides)
