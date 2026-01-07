import 'dotenv/config'
import { PrismaClient } from '../prisma/generated/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { conversionByVariant } from '../prisma/generated/sql'
import { filterTrackingEvents } from '../prisma/generated/sql'
import { getTrackingEvents } from '../prisma/generated/sql'

async function main() {
  const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || 'file:./dev.db' })
  const prisma = new PrismaClient({ adapter })

  const stats = await prisma.$queryRawTyped(conversionByVariant())
  console.log(stats)

  const rows = await prisma.$queryRawTyped(
    filterTrackingEvents(
      JSON.stringify(['PageOpened', 'ButtonClicked']),
      JSON.stringify(['BlueBuyButton', 'RedBuyButton']),
    ),
  )
  console.log(rows)

  const result = await prisma.$queryRawTyped(getTrackingEvents(5))
  console.log(result)
}

main()
