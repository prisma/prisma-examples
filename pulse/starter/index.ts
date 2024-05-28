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
  const stream = await prisma.user.stream()

  process.on('exit', (code) => {
    stream.stop()
  })

  for await (const event of stream) {
    console.log('just received an event:', event)
  }
}

main()
