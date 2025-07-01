// .github/get-ppg-dev/index.js
import { unstable_startServer } from '@prisma/dev'
import fs from 'fs'

const ENV_PATH = '/tmp/prisma-dev-env.json'

const server = await unstable_startServer({ persistenceMode: 'stateless' })
const dbUrl = server.ppg.url

fs.writeFileSync(ENV_PATH, JSON.stringify({ DATABASE_URL: dbUrl }, null, 2))

console.log(`✅ DATABASE_URL exported to ${ENV_PATH}`)
process.stdin.resume()

process.on('SIGINT', async () => {
  await server.close()
  fs.unlinkSync(ENV_PATH)
  console.log('🧹 Cleaned up dev server')
  process.exit(0)
})
