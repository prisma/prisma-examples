import { PrismaClient } from '@prisma/client'
import { conversionByVariant, countEvents } from '@prisma/client/sql'

async function main() {
  const prisma = new PrismaClient()

  const result = await prisma.$queryRawTyped(countEvents('user133@example.com'))

  console.log(result)
}

main();
