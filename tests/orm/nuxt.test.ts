import { describe, test } from 'vitest'

describe('orm/nuxt', () => {
  test.skip('disabled - Prisma Dev server has race condition issues', async () => {
    // This test has intermittent failures with Prisma Dev server
  })
})
