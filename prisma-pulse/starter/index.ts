import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { withPulse } from '@prisma/extension-pulse'

process.on('SIGINT', () => {
  process.exit(0)
})

const apiKey: string = process.env.PULSE_API_KEY ?? ''
const prisma = new PrismaClient().$extends(
  withPulse({ apiKey: apiKey })
)

async function main() {
  const subscription = await prisma.user.subscribe()

  process.on('exit', (code) => {
    subscription.stop()
  })

  if (subscription instanceof Error) {
    throw subscription
  }

  for await (const event of subscription) {
    console.log('just received an event:', event)
  }
}

main()
