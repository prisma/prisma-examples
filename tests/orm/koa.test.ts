import { describe, test, afterAll } from 'vitest'
import { startPrismaDev, runExample, type PrismaDevServer } from '../utils/index.js'

describe('orm/koa', () => {
  let db: PrismaDevServer

  afterAll(async () => {
    await db?.stop()
  })

  test('prisma setup and build', async () => {
    db = await startPrismaDev()
    await runExample('orm/koa', db.url)
  })
})
