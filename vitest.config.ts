import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    testTimeout: 300000,
    hookTimeout: 120000,
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: false,
      },
    },
    maxConcurrency: 8,
    fileParallelism: true,
    sequence: {
      concurrent: true,
    },
    include: ['tests/**/*.test.ts'],
  },
})
