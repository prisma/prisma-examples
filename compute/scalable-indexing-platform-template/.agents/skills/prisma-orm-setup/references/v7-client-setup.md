# Prisma Client Setup

Generate and instantiate **Prisma ORM 7** Client for SQL providers. For MongoDB, follow [Prisma 6 MongoDB setup](v6-mongodb.md). For an existing Prisma 6 SQL app, preserve its client setup rather than copying these examples.

## 1. Install dependencies

```bash
npm install --save-dev prisma@7
npm install @prisma/client@7 dotenv
```

For an existing application, retain its pinned releases. For a new Prisma 7 application, use compatible CLI, client, and adapter versions and check the [Prisma 7 runtime requirements](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v7#prerequisites).

## 2. Add generator block

In `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated"
}
```

`prisma-client` requires an explicit `output` path and does not generate into `node_modules` by default.

## 3. Generate Prisma Client

```bash
npx prisma generate
```

Re-run `prisma generate` after every schema change to keep the client in sync.

## 4. Instantiate Prisma Client

```typescript
import 'dotenv/config'
import { PrismaClient } from '../generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })
```

If you change the generator `output`, update the import path to match. For the SQL provider workflow, replace `PrismaPg` with the adapter for your database.

## 5. Use a single instance

Each `PrismaClient` instance creates a connection pool. Reuse a single instance per app process to avoid exhausting database connections.
