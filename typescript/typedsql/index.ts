import { PrismaClient } from './node_modules/.prisma/client'
import { conversionByVariant } from './node_modules/.prisma/client/sql'

async function main() {
  const prisma = new PrismaClient()

  const stats = await prisma.$queryRawTyped(conversionByVariant())

  console.log(stats)
}

main()
