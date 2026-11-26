import { PrismaClient } from '../prisma/generated/index.js'

const prisma = new PrismaClient()

async function main() {
  // Create two isolated tenants
  const acme = await prisma.tenant.upsert({
    where: { slug: 'acme' },
    update: {},
    create: { name: 'Acme Corp', slug: 'acme' },
  })

  const globex = await prisma.tenant.upsert({
    where: { slug: 'globex' },
    update: {},
    create: { name: 'Globex Inc', slug: 'globex' },
  })

  // Create users for each tenant
  const aliceAcme = await prisma.user.upsert({
    where: { email_tenantId: { email: 'alice@acme.com', tenantId: acme.id } },
    update: {},
    create: { email: 'alice@acme.com', name: 'Alice', tenantId: acme.id },
  })

  const bobGlobex = await prisma.user.upsert({
    where: { email_tenantId: { email: 'bob@globex.com', tenantId: globex.id } },
    update: {},
    create: { email: 'bob@globex.com', name: 'Bob', tenantId: globex.id },
  })

  // Create orders for each tenant
  await prisma.order.upsert({
    where: { reference_tenantId: { reference: 'ACM-001', tenantId: acme.id } },
    update: {},
    create: {
      reference: 'ACM-001',
      amount: 1250.0,
      status: 'COMPLETED',
      tenantId: acme.id,
      userId: aliceAcme.id,
    },
  })

  await prisma.order.upsert({
    where: { reference_tenantId: { reference: 'ACM-002', tenantId: acme.id } },
    update: {},
    create: {
      reference: 'ACM-002',
      amount: 540.0,
      status: 'PENDING',
      tenantId: acme.id,
      userId: aliceAcme.id,
    },
  })

  await prisma.order.upsert({
    where: { reference_tenantId: { reference: 'GLX-001', tenantId: globex.id } },
    update: {},
    create: {
      reference: 'GLX-001',
      amount: 3200.0,
      status: 'PROCESSING',
      tenantId: globex.id,
      userId: bobGlobex.id,
    },
  })

  console.log('Seeded:')
  console.log(`  Tenant "Acme Corp" (id: ${acme.id}) — 1 user, 2 orders`)
  console.log(`  Tenant "Globex Inc" (id: ${globex.id}) — 1 user, 1 order`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
