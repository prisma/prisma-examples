# Prisma Compute examples

These examples show Prisma ORM apps deployed to Prisma Compute with the
latest `@prisma/cli`.

| Example | Description |
| --- | --- |
| [`hono`](./hono) | Hono API on Node.js. |
| [`nextjs`](./nextjs) | Next.js App Router app using standalone output for Prisma Compute. |
| [`tanstack-start`](./tanstack-start) | TanStack Start app using the Nitro Vite plugin output supported by Prisma Compute. |

Each example includes Prisma ORM, a PostgreSQL schema, seed data, and scripts for
local development and Prisma Compute deployment.

The Compute scripts call `npx @prisma/cli@latest` directly, so the examples do
not pin or install the Prisma CLI.
