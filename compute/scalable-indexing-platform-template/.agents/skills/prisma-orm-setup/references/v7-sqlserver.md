# SQL Server Setup

Configure **Prisma ORM 7** with SQL Server. For an existing Prisma 6 app, keep its configuration and use the [Prisma 6 docs](https://www.prisma.io/docs/orm/v6); the configuration and adapter examples below are for 7.

## Prerequisites

- SQL Server 2017, 2019, 2022, or Azure SQL
- TCP/IP enabled

## 1. Schema Configuration

In `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "sqlserver"
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
DATABASE_URL="sqlserver://localhost:1433;database=mydb;user=sa;password=Password123;encrypt=true;trustServerCertificate=true"
```

### Connection String Format

```
sqlserver://HOST:PORT;database=DB;user=USER;password=PASS;encrypt=true;trustServerCertificate=true
```

- **encrypt**: Required for Azure (true).
- **trustServerCertificate**: True for self-signed certs (local dev).

## Driver Adapter

Use a driver adapter for the standard SQL workflow.

1. Install adapter and driver:
   ```bash
   npm install @prisma/adapter-mssql@7 mssql
   ```

2. Set `SQLSERVER_USER` and `SQLSERVER_PASSWORD` in the application environment to match the CLI URL, and use the same server, port, database, and TLS options. The following example is for local development with a self-signed certificate; use certificate verification for hosted databases. Instantiate Prisma Client with the adapter:

   ```typescript
   import 'dotenv/config'
   import { PrismaClient } from '../generated/client'
   import { PrismaMssql } from '@prisma/adapter-mssql'

   const adapter = new PrismaMssql({
     server: 'localhost',
     port: 1433,
     database: 'mydb',
     user: process.env.SQLSERVER_USER,
     password: process.env.SQLSERVER_PASSWORD,
     options: {
       encrypt: true,
       trustServerCertificate: true,
     },
   })

   const prisma = new PrismaClient({ adapter })
   ```

## Common Issues

### "Login failed for user"
- SQL Server auth vs Windows auth. Prisma typically uses SQL Server authentication (username/password).
- Ensure TCP/IP is enabled in SQL Server Configuration Manager.

### "Table not found" (dbo schema)

Check that the connection URL's `schema` parameter (normally `dbo`) matches the intended schema. Preserve an existing multi-schema configuration and model mappings.

## References

- [Prisma 7 SQL Server documentation](https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/sql-server)
