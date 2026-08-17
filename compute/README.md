# Prisma Compute examples

These examples show Prisma 8 apps deployed to Prisma Compute with Prisma
Composer.

| Example | Description |
| --- | --- |
| [`hono`](./hono) | Hono API on Node.js. |
| [`nextjs`](./nextjs) | Next.js App Router app using standalone output for Prisma Compute. |
| [`tanstack-start`](./tanstack-start) | TanStack Start app using the Nitro Vite plugin output supported by Prisma Compute. |

Each example includes a Prisma 8 contract, generated typed client metadata,
seed data, a Composer module, and a GitHub Actions deployment workflow.
Deploy the companion Console change before publishing these templates so the
one-click flow can validate and copy their Composer files.

The templates pin the Prisma 8 release candidate and its compatible Composer
integration. They use `bunx @prisma/cli@next` for Prisma Cloud commands because
the `latest` tag still points at the earlier CLI command set. These pins can
move to stable releases after Prisma 8 and the matching Composer integration
reach general availability.
