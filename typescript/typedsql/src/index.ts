import { PrismaClient } from '@prisma/client'
import { conversionByVariant } from '@prisma/client/sql'

async function main() {
  const prisma = new PrismaClient()

  const stats = await prisma.$queryRawTyped(conversionByVariant())

  console.log(stats)
}

main()
