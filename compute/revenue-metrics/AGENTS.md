## This project

A revenue metrics dashboard template: Next.js 16 App Router, Prisma ORM 8, Prisma Postgres, Prisma Compute via Prisma Composer. Each metric is one SQL query, typed with `.returnsRow()`. See README.md.

- Node.js 22.18 or newer (`.nvmrc` selects Node 24) and Bun. `prisma dev` does not run on Windows (`DEV.PLATFORM_UNSUPPORTED`); use `bun run dev` with a database URL in `.env.local`.
- The four queries live in `src/queries.ts`. Cast every computed column in SQL (`::int8`, `::int4`) to match its codec in `.returnsRow()`: codecs read values, they do not convert them. The SQL panel shows each query via `db.toSql()`, so keep the SQL readable.
- The tables match the Stripe tables Codeless Sync creates (same columns, types and nulls). Do not rename or drop columns in `src/prisma/contract.prisma`, or synced data stops fitting. Extra columns and indexes are fine.
- Schema changes: edit `src/prisma/contract.prisma`, then `bun run contract:emit`, `bun run migration:plan --name <name>`, `bun run db:migrate`. Never hand-edit `ops.json`, `contract.json` or `contract.d.ts`.
- Demo rows have ids containing `_seed_`. `bun run db:seed` replaces them, `bun run db:seed --remove` deletes them; other rows are never touched.
- Local settings go in `.env.local`, never `.env` (`next build` copies `.env` into the deployed bundle). With Prisma Postgres use the direct host `db.prisma.io`, not `pooled.db.prisma.io` (prisma/orm#31081).
- Deploy is `bun run deploy` (`next build`, then `prisma deploy`). On Windows, `bunx prisma deploy` fails (its deploy engine relaunches itself through `bunx.exe`); `bun run deploy` works. A deploy is production; ask first.
- Before committing: `bun run typecheck`, `bun run build`.
