import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    testTimeout: 300000,
    hookTimeout: 120000,
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    maxConcurrency: 1,
    fileParallelism: true,
    include: ['tests/**/*.test.ts'],
  },
})
