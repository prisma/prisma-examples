/**
 * Multi-tenant example: row-level scoping with Prisma
 *
 * Demonstrates two patterns for tenant isolation:
 *   1. Manual scoping with tenantWhere() + assertTenantAccess()
 *   2. Automatic scoping with a PrismaClient extension (createTenantClient)
 *
 * Run:
 *   npx prisma migrate dev --name init
 *   npx tsx src/seed.ts
 *   npx tsx src/index.ts
 */

import { PrismaClient } from '../prisma/generated/index.js'
import { tenantWhere, assertTenantAccess, createTenantClient } from './tenant-scope.js'

const prisma = new PrismaClient()

async function main() {
  // Resolve tenant from slug (in a real app this comes from the auth session)
  const acme = await prisma.tenant.findUniqueOrThrow({ where: { slug: 'acme' } })
  const globex = await prisma.tenant.findUniqueOrThrow({ where: { slug: 'globex' } })

  console.log('\n--- Pattern 1: Manual scoping with tenantWhere() ---\n')

  // Scoped query — only Acme orders returned, even though the table has Globex orders too
  const acmeOrders = await prisma.order.findMany({
    where: {
      ...tenantWhere(acme.id),
      status: 'PENDING',
    },
    select: { reference: true, amount: true, status: true },
  })
  console.log('Acme pending orders:', acmeOrders)
  // → [ { reference: 'ACM-002', amount: 540, status: 'PENDING' } ]

  // Cross-tenant access check after fetching by a non-tenant key
  const order = await prisma.order.findFirst({ where: { reference: 'GLX-001' } })
  try {
    assertTenantAccess(order, acme.id, 'order')
  } catch (err) {
    console.log('Correctly blocked cross-tenant access:', (err as Error).message)
    // → "Access denied: order belongs to a different tenant"
  }

  console.log('\n--- Pattern 2: Automatic scoping with createTenantClient() ---\n')

  // All queries on this client are automatically filtered to Globex
  const db = createTenantClient(prisma, globex.id)

  const globexOrders = await db.order.findMany({
    select: { reference: true, amount: true },
  })
  console.log('Globex orders (tenant auto-applied):', globexOrders)
  // → [ { reference: 'GLX-001', amount: 3200 } ]

  const globexUsers = await db.user.findMany({
    select: { email: true, name: true },
  })
  console.log('Globex users (tenant auto-applied):', globexUsers)
  // → [ { email: 'bob@globex.com', name: 'Bob' } ]

  // Count across all tenants vs. scoped
  const totalOrders = await prisma.order.count()
  const globexOrderCount = await db.order.count()
  console.log(`\nTotal orders in DB: ${totalOrders}, Globex-scoped: ${globexOrderCount}`)
  // → Total: 3, Globex-scoped: 1
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
