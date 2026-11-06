# CockroachDB Setup

Configure **Prisma ORM 7** with CockroachDB. For an existing Prisma 6 app, keep its configuration and use the [Prisma 6 docs](https://www.prisma.io/docs/orm/v6); the configuration and adapter examples below are for 7.

## Prerequisites

- CockroachDB cluster

## 1. Schema Configuration

In `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "cockroachdb"
}

generator client {
  provider = "prisma-client"
  output   = "../generated"
}
```

## 2. Config Configuration

In `prisma.config.ts`:

```typescript
import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
})
```

## 3. Environment Variable

In `.env`:

```env
DATABASE_URL="postgresql://user:password@host:26257/db?sslmode=verify-full"
```

Note: CockroachDB uses the PostgreSQL wire protocol, so the URL often looks like postgresql, but the provider **MUST** be `cockroachdb` in the schema to handle specific CRDB features correctly.

## Driver Adapter

Use a driver adapter for the standard SQL workflow. CockroachDB is PostgreSQL-compatible, so use the PostgreSQL adapter.

1. Install adapter and driver:
   ```bash
   npm install @prisma/adapter-pg@7 pg
   ```

2. Instantiate Prisma Client with the adapter:
   ```typescript
   import 'dotenv/config'
   import { PrismaClient } from '../generated/client'
   import { PrismaPg } from '@prisma/adapter-pg'

   const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
   const prisma = new PrismaClient({ adapter })
   ```

## ID Generation

CockroachDB uses `BigInt` or `UUID` for IDs efficiently.

```prisma
model User {
  id BigInt @id @default(autoincrement()) // Uses unique_rowid()
}
```

Or using string UUIDs:

```prisma
model User {
  id String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
}
```

## Common Issues

### Schema Introspection
Always use `provider = "cockroachdb"` to ensure correct type mapping during `db pull`.

## References

- [Prisma 7 CockroachDB documentation](https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/cockroachdb)
