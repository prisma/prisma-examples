# Prisma Postgres with Prisma ORM 7

Use this reference for an existing or explicitly selected **Prisma ORM 7** app. Obtain or reuse the database through [prisma-postgres-setup](../../prisma-postgres-setup/SKILL.md).

## Node.js connections

Use the PostgreSQL TCP connection supplied by Prisma Console or the integration and follow [PostgreSQL setup](v7-postgresql.md). Use a pooled or direct connection according to the intended operation. A `prisma+postgres://` Accelerate URL is not a TCP connection string for `PrismaPg`.

## Edge connections

For a runtime without PostgreSQL TCP support, Prisma Postgres provides an HTTP/WebSocket driver. With a Prisma 7 client:

```bash
npm install @prisma/adapter-ppg@7 @prisma/ppg
```

```typescript
import { PrismaClient } from '../generated/client'
import { PrismaPostgresAdapter } from '@prisma/adapter-ppg'

const prisma = new PrismaClient({
  adapter: new PrismaPostgresAdapter({
    connectionString: process.env.DATABASE_URL!,
  }),
})
```

The serverless driver takes a direct Prisma Postgres connection string as its credential and communicates over HTTP/WebSockets. It does not open a TCP connection. Load secrets through the host's supported mechanism and set the Prisma 7 generator's `runtime` to that deployment target.

These adapter examples do not configure Prisma 8. Its runtime guidance belongs to the installed `prisma-8` skill.

See the [Prisma Postgres serverless driver documentation](https://www.prisma.io/docs/postgres/database/serverless-driver) for connection selection and supported runtimes.
