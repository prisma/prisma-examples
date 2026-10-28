# Multi-tenant Row-Level Scope with Prisma

This example demonstrates how to enforce tenant isolation at the data access layer using Prisma. Two patterns are covered:

1. **Manual scoping** — `tenantWhere()` + `assertTenantAccess()` helpers added to individual queries
2. **Automatic scoping** — a `PrismaClient` extension (`createTenantClient`) that injects `tenantId` into every query automatically

## Schema

```
Tenant ──┬── User (@@unique([email, tenantId]))
         └── Order (@@unique([reference, tenantId]))
```

Each row on `User` and `Order` carries a `tenantId` column. All queries must filter by this column — either manually or via the extension.

## Setup

**Prerequisites:** PostgreSQL running locally (or use `DATABASE_URL` with a hosted instance).

```bash
cp .env.example .env
# Edit .env and set DATABASE_URL

npm install
npm run migrate    # runs: prisma migrate dev --name init
npm run seed       # creates two tenants with sample data
npm run dev        # runs the demo queries
```

## Patterns

### Pattern 1: Manual scoping

```ts
import { tenantWhere, assertTenantAccess } from './src/tenant-scope.js'

// Scoped query — only this tenant's pending orders
const orders = await prisma.order.findMany({
  where: {
    ...tenantWhere(tenantId),
    status: 'PENDING',
  },
})

// Guard after fetching by a non-tenant key
const order = await prisma.order.findFirst({ where: { reference } })
assertTenantAccess(order, tenantId, 'order')  // throws if wrong tenant
```

Use this pattern when you need fine-grained control over individual queries, or when only some queries need scoping.

### Pattern 2: Automatic scoping via client extension

```ts
import { createTenantClient } from './src/tenant-scope.js'

const db = createTenantClient(prisma, tenantId)

// tenantId is injected automatically — no manual spreading needed
const orders = await db.order.findMany({ where: { status: 'PENDING' } })
const users  = await db.user.findMany()
```

Use this pattern in a per-request context (Next.js Server Actions, Express middleware, etc.) where you resolve `tenantId` once from the session and want all downstream queries to be automatically scoped.

## What this prevents

- Cross-tenant data reads (a user from Tenant A fetching Tenant B's orders)
- Missing `WHERE tenantId = ?` clauses that return all-tenants data
- Silent cross-tenant leaks via non-tenant lookup keys (e.g. `findUnique({ where: { id } })`)

## See also

- [Prisma Client Extensions](https://www.prisma.io/docs/orm/prisma-client/client-extensions)
- [Multi-tenant applications guide](https://www.prisma.io/docs/guides/other/multi-tenancy)
