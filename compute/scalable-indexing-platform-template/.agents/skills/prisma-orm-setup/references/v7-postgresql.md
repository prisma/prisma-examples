# PostgreSQL Setup

Configure **Prisma ORM 7** with PostgreSQL. For an existing Prisma 6 app, keep its configuration and use the [Prisma 6 docs](https://www.prisma.io/docs/orm/v6); the configuration and adapter examples below are for 7.

## Prerequisites

- PostgreSQL database (local or cloud)
- Connection string

## 1. Schema Configuration

In `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
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
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

### Connection String Format

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

- **USER**: Database user
- **PASSWORD**: Password (URL encoded if special chars)
- **HOST**: Hostname (localhost, IP, or domain)
- **PORT**: Port (default 5432)
- **DATABASE**: Database name
- **SCHEMA**: Schema name (default `public`)

## Driver Adapter

Use a driver adapter for the standard SQL workflow.

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

## Common Issues

### "Can't reach database server"
- Check host and port
- Check firewall settings
- Ensure database is running

### "Authentication failed"
- Check user/password
- Special characters in password must be URL-encoded

### "Schema does not exist"
- Ensure `?schema=public` (or your schema) is in the URL

## References

- [Prisma 7 PostgreSQL documentation](https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/postgresql)
