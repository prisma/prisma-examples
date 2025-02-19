import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { conversionByVariant } from '@prisma/client/sql'
import { filterTrackingEvents } from '@prisma/client/sql'
import { getTrackingEvents } from '@prisma/client/sql'

async function main() {
  const prisma = new PrismaClient().$extends(withAccelerate())

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
