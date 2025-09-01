// prisma/seed.ts
import { PrismaClient } from '../generated/prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create multiple users
  await prisma.user.createMany({
    data: [
      { email: 'alice@example.com', name: 'Alice' },
      { email: 'bob@example.com', name: 'Bob' },
      { email: 'charlie@example.com', name: 'Charlie' },
      { email: 'diana@example.com', name: 'Diana' },
      { email: 'eve@example.com', name: 'Eve' },
      { email: 'frank@example.com', name: 'Frank' },
      { email: 'grace@example.com', name: 'Grace' },
      { email: 'henry@example.com', name: 'Henry' },
      { email: 'isabella@example.com', name: 'Isabella' },
      { email: 'jack@example.com', name: 'Jack' },
    ],
    skipDuplicates: true, // prevents errors if you run the seed multiple times
  })

  console.log('Seed data inserted!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
