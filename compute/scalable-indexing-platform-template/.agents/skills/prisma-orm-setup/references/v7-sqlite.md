# SQLite Setup

Configure **Prisma ORM 7** with SQLite. For an existing Prisma 6 app, keep its configuration and use the [Prisma 6 docs](https://www.prisma.io/docs/orm/v6); the configuration and adapter examples below are for 7.

## Prerequisites

- None (file-based)

## 1. Schema Configuration

In `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "sqlite"
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
DATABASE_URL="file:./dev.db"
```

### Connection String Format

```
file:PATH
```

- **PATH**: Relative path to the database file. Check `prisma.config.ts` if you need to confirm how your app resolves it.

## Driver Adapter

Use a driver adapter for the standard SQL workflow.

1. Install adapter and driver:
   ```bash
   npm install @prisma/adapter-better-sqlite3@7 better-sqlite3
   ```

2. Instantiate Prisma Client with the adapter:
   ```typescript
   import 'dotenv/config'
   import { PrismaClient } from '../generated/client'
   import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

   const adapter = new PrismaBetterSqlite3({
     url: process.env.DATABASE_URL!,
   })

   const prisma = new PrismaClient({ adapter })
   ```

## Using Driver Adapter (LibSQL / Turso)

For edge compatibility or Turso:

1. Install:
   ```bash
   npm install @prisma/adapter-libsql@7 @libsql/client
   ```

2. Instantiate:
   ```typescript
   import 'dotenv/config'
   import { PrismaClient } from '../generated/client'
   import { PrismaLibSql } from '@prisma/adapter-libsql'

   const adapter = new PrismaLibSql({
     url: process.env.TURSO_DATABASE_URL,
     authToken: process.env.TURSO_AUTH_TOKEN,
   })
   const prisma = new PrismaClient({ adapter })
   ```

## Limitations

- **Enums**: Prisma supports enum fields, but SQLite does not enforce enum values at the database level.
- **No Scalar Lists**: `String[]` is not supported directly.
- **Concurrency**: Write operations lock the file.

## Common Issues

### "Database file not found"

Check the resolved file path for both the CLI and the runtime adapter; relative paths can resolve differently. Use an explicit path to the intended file rather than silently creating a second database.

## References

- [Prisma 7 SQLite documentation](https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/sqlite)
