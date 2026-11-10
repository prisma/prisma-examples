<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## This project

A room booking template: Next.js 16 App Router, Resource Scheduler (from npm), Prisma ORM 8, Prisma Postgres, Prisma Compute via Prisma Composer. See README.md.

- Node.js 24.11.1 or newer (`engines` in `package.json`; `.nvmrc` selects Node 24); the Prisma CLI needs 22.18+. Bun must be installed for `bun run dev:composer`, and it does not run on Windows (`prisma dev` returns `DEV.PLATFORM_UNSUPPORTED`): use macOS, Linux, WSL or a Linux container. `prisma dev` runs in the foreground (Ctrl+C stops it); `prisma dev --detach` returns once the app answers, and `prisma dev stop` stops it.
- Deploy is `bun run deploy` (`next build`, then `prisma deploy`; the entry file is `entry` in the `composer` section of `prisma.config.ts`). There is no `prisma.compute.ts`, `defineComputeConfig` or `compute:deploy`: that flow was removed. Do not add them. A deploy without `--environment` is production; ask first. `bunx prisma auth login` needs a person at a browser.
- Booking rules live in one place, `src/lib/rules.ts`, used by the browser (`<ResourceScheduler {...}>`) and the server (`isPlacementAllowed` in `src/server/bookings.ts`). Keep them independent of the machine's time zone (`utcToZoned(date, OFFICE_TIME_ZONE)`).
- Every booking write locks the room row(s) inside `db.transaction` before checking; keep the lock order (booking, then rooms sorted by id). Prisma ORM 8 has no isolation-level option.
- Schema changes: edit `src/prisma/contract.prisma`, `bun run contract:emit`, `bun run migration:plan --name <name>`, `bun run db:migrate`. Never hand-edit `ops.json`; edit `migration.ts` and run it with `node` to recompile.
- Local settings go in `.env.local`, never `.env` (`next build` copies `.env` into the deployed bundle).
- Before committing: `bun run lint`, `bun run typecheck`, `bun run test` (with `TEST_DATABASE_URL` for the PostgreSQL tests), `bun run build`.
