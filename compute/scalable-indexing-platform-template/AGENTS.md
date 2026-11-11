<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## This project

A resource directory template (DevShelf): Next.js 16 App Router, Prisma ORM 8, Prisma Postgres, Prisma Compute via Prisma Composer. See README.md.

- Node.js 22.18 or newer (`.nvmrc` selects Node 24) and Bun. `bun run composer:dev` does not run on Windows; use macOS, Linux, WSL or a Linux container.
- The catalog query is in `src/lib/resources.ts`. Every list is ordered by `id` so the keyset cursor is exact; keep `id` as the last sort key if you add another order.
- Schema changes: edit `src/prisma/contract.prisma`, then `bun run contract:emit`, `bun run migration:plan --name <name>`, `bun run db:migrate`. Never hand-edit `ops.json`, `contract.json` or `contract.d.ts`.
- Local settings go in `.env.local`, never `.env` (`next build` copies `.env` into the deployed bundle).
- Deploy is `bun run build`, then `bun run composer:deploy`. A deploy without `--stage` is production; ask first.
- Before committing: `bun run lint`, `bun run typecheck`, `bun run build`.
