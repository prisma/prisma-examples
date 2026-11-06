# MySQL Setup

Configure **Prisma ORM 7** with MySQL and MariaDB. For an existing Prisma 6 app, keep its configuration and use the [Prisma 6 docs](https://www.prisma.io/docs/orm/v6); the configuration and adapter examples below are for 7.

## Prerequisites

- MySQL or MariaDB database
- Connection string

## 1. Schema Configuration

In `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "mysql"
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
DATABASE_URL="mysql://user:password@localhost:3306/mydb"
```

### Connection String Format

```
mysql://USER:PASSWORD@HOST:PORT/DATABASE
```

- **USER**: Database user
- **PASSWORD**: Password
- **HOST**: Hostname
- **PORT**: Port (default 3306)
- **DATABASE**: Database name

## Driver Adapter

Use a driver adapter for the standard SQL workflow.

1. Install adapter and driver:
   ```bash
   npm install @prisma/adapter-mariadb@7 mariadb
   ```

2. Set `MYSQL_USER`, `MYSQL_PASSWORD`, and `MYSQL_DATABASE` in the application environment to match the CLI URL, and use the same host and port. Instantiate Prisma Client with the adapter:

   ```typescript
   import 'dotenv/config'
   import { PrismaClient } from '../generated/client'
   import { PrismaMariaDb } from '@prisma/adapter-mariadb'

   const adapter = new PrismaMariaDb({
     host: 'localhost',
     port: 3306,
     connectionLimit: 5,
     user: process.env.MYSQL_USER,
     password: process.env.MYSQL_PASSWORD,
     database: process.env.MYSQL_DATABASE,
   })

   const prisma = new PrismaClient({ adapter })
   ```

### Text protocol option

If you need the MariaDB driver's text protocol instead of the default binary `execute()` path, enable `useTextProtocol` explicitly:

```typescript
import { PrismaClient } from '../generated/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!, {
  useTextProtocol: true,
})

const prisma = new PrismaClient({ adapter })
```

Use this only when you specifically need text-protocol compatibility for your MariaDB setup.

## PlanetScale Setup

Check whether foreign key constraints are enabled on the PlanetScale database. When they are disabled, use `relationMode = "prisma"` and add indexes for relation fields. Do not override an existing database that has foreign keys enabled.

In `prisma/schema.prisma`:

```prisma
datasource db {
  provider     = "mysql"
  relationMode = "prisma" // Emulate foreign keys in Prisma
}
```

## Common Issues

### "Too many connections"

Set `connectionLimit` on `PrismaMariaDb`, as in the example above. The Prisma 6 `connection_limit` URL parameter does not configure the Prisma 7 adapter pool.

### JSON Support
MySQL 5.7+ supports JSON. MariaDB 10.2+ supports JSON (as an alias for LONGTEXT with check constraints). Prisma handles this, but verify your version.

## References

- [Prisma 7 connection pool settings](https://www.prisma.io/docs/orm/v7/prisma-client/setup-and-configuration/databases-connections/connection-pool)
- [PlanetScale foreign key configuration](https://www.prisma.io/docs/orm/v7/overview/databases/planetscale)
- [Prisma 7 MySQL and MariaDB documentation](https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/mysql)
