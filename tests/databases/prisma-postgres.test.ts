import { describe, test, afterAll } from 'vitest'
import { startPrismaDev, runExample, type PrismaDevServer } from '../utils/index.js'

describe('databases/prisma-postgres', () => {
  let db: PrismaDevServer

  afterAll(async () => {
    await db?.stop()
  })

  test('prisma setup and build', async () => {
    db = await startPrismaDev()
    await runExample('databases/prisma-postgres', db.url)
  })
})
