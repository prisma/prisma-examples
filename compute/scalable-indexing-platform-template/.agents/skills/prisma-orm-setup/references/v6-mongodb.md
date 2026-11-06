# MongoDB Setup

This reference configures **Prisma ORM 6 MongoDB** applications. Preserve an existing Prisma 6 app or use this path when 6 is explicitly selected. Do not apply Prisma 7 SQL adapters here.

## Prerequisites

- MongoDB 4.2+
- Replica Set configured (required for transactions)
- Latest Prisma 6.x release, or your team's pinned Prisma 6 version
- A Node.js and TypeScript version supported by the selected Prisma 6 release

## 1. Schema Configuration

Use the standard Prisma 6 MongoDB setup with `prisma-client-js`.

In `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

### Driver Adapters

Do **not** apply the Prisma 7 SQL adapter setup here. MongoDB does not use a SQL `@prisma/adapter-*` package.

### ID Field Requirement

MongoDB models **must** have a mapped `_id` field using `@id` and `@map("_id")`, usually of type `String` with `auto()` and `db.ObjectId`.

```prisma
model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  email String @unique
  name  String?
  posts Post[]
}
```

### Relations

Relations in MongoDB expect IDs to be `db.ObjectId` type.

```prisma
model Post {
  id       String @id @default(auto()) @map("_id") @db.ObjectId
  author   User   @relation(fields: [authorId], references: [id])
  authorId String @db.ObjectId
}
```

## 2. Environment Variable

In `.env`:

```env
DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/mydb?retryWrites=true&w=majority"
```

## Migrations vs Introspection

- **No Migrations**: MongoDB is schema-less. `prisma migrate` commands **do not work**.
- **db push**: Use `prisma db push` to sync indexes and constraints.
- **db pull**: Use `prisma db pull` to generate schema from existing data (sampling).

## Client setup

Keep existing pinned versions. For a new explicitly selected Prisma 6 setup:

```bash
npm install --save-dev prisma@6
npm install @prisma/client@6 dotenv
```

Generate with the matching CLI, then initialize the client without a SQL adapter:

```typescript
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
```

Use a read-only model query to verify connectivity. Review any index changes before applying `db push` to an existing database.

## Common Issues

### "Transactions not supported"
Ensure your MongoDB instance is a **Replica Set**. Standalone instances do not support transactions. Atlas clusters are replica sets by default.

### "Invalid ObjectID"
Ensure fields referencing IDs are decorated with `@db.ObjectId` if the target is an ObjectID.

## References

- [Prisma 6 MongoDB connector](https://www.prisma.io/docs/orm/v6/overview/databases/mongodb)
