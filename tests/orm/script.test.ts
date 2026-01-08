import { describe, test, afterAll } from 'vitest'
import { startPrismaDev, runExample, type PrismaDevServer } from '../utils/index.js'

describe('orm/script', () => {
  let db: PrismaDevServer

  afterAll(async () => {
    await db?.stop()
  })

  test('prisma setup', async () => {
    db = await startPrismaDev()
    await runExample('orm/script', db.url, { skipSeed: true })
  })
})
