# Prisma Compute examples

These examples show Prisma ORM apps deployed to Prisma Compute.

| Example | Description |
| --- | --- |
| [`hono`](./hono) | Hono API on Node.js. |
| [`nextjs`](./nextjs) | Next.js App Router app using standalone output for Prisma Compute. |
| [`tanstack-start`](./tanstack-start) | TanStack Start app using the Nitro Vite plugin output supported by Prisma Compute. |
| [`form-backend`](./form-backend) | Self-hosted form endpoint (Formspree-style) with a dashboard and CSV export, built with Hono and Prisma Composer. |

Each example includes Prisma ORM, a PostgreSQL schema, seed data, and scripts for
local development and Prisma Compute deployment.

`form-backend` is a full application rather than a framework starter: it uses
[Prisma Composer](./form-backend/README.md#deploy) to provision its database
and deploy the service (`bun run deploy`) instead of the `prisma.compute.json`
+ `git connect` flow the framework templates use.

The Compute scripts call `bunx @prisma/cli@next` directly, so the examples do
not pin or install the Prisma CLI. They use `@next` because these examples
target the Prisma 8 release candidate, while the `latest` npm tag still points
at the earlier 3.x beta CLI with a different command set. When Prisma 8 reaches
general availability, the `@next` references will switch to `@latest`.
