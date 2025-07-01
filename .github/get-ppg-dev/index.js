import { unstable_startServer } from '@prisma/dev'

async function main() {
  const server = await unstable_startServer({
    persistenceMode: 'stateless',
  })

  // Emit only the Prisma-compatible URL for CI shell script to capture
  console.log(server.ppg.url)

  // Wait for shutdown signal
  process.once('SIGTERM', async () => {
    await server.close()
    process.exit(0)
  })

  process.once('SIGINT', async () => {
    await server.close()
    process.exit(0)
  })
}

main().catch((err) => {
  console.error('❌ Failed to start dev server:', err)
  process.exit(1)
})
