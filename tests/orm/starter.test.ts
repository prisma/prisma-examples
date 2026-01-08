import { describe, test, afterAll } from 'vitest'
import { startPrismaDev, runExample, type PrismaDevServer } from '../utils/index.js'

describe('orm/starter', () => {
  let db: PrismaDevServer

  afterAll(async () => {
    await db?.stop()
  })

  test('prisma setup and build', async () => {
    db = await startPrismaDev()
    await runExample('orm/starter', db.url)
  })
})
