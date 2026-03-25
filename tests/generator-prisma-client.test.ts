import { describe, test } from 'vitest'
import { testExample, testSqliteExample } from './fixtures.js'

describe('Generator Prisma Client Examples', () => {
  testExample('generator-prisma-client/esbuild-cjs')
  testExample('generator-prisma-client/nextjs-starter-turbopack')
  testExample('generator-prisma-client/nextjs-starter-webpack')
  testExample('generator-prisma-client/nextjs-starter-webpack-with-middleware')
  testExample('generator-prisma-client/nuxt3-starter-nodejs')
  testExample('generator-prisma-client/nuxt4-starter-nodejs')
  testExample('generator-prisma-client/react-router-starter-nodejs')

  testSqliteExample('generator-prisma-client/basic-typedsql', { generateSql: true })
  testSqliteExample('generator-prisma-client/vitest-esm-nodejs')

  describe('generator-prisma-client/aws-lambda-sst-esbuild', () => {
    test.skip('requires SST/AWS runtime setup', () => {})
  })

  describe('generator-prisma-client/bun', () => {
    test.skip('requires Bun runtime', () => {})
  })

  describe('generator-prisma-client/deno-deploy', () => {
    test.skip('requires Deno runtime', () => {})
  })

  describe('generator-prisma-client/react-router-starter-cloudflare-workerd', () => {
    test.skip('requires Cloudflare workerd runtime', () => {})
  })

  describe('generator-prisma-client/nextjs-starter-webpack-monorepo', () => {
    test.skip('requires pnpm workspace/monorepo tooling', () => {})
  })

  describe('generator-prisma-client/nextjs-starter-webpack-turborepo', () => {
    test.skip('requires pnpm/turborepo tooling', () => {})
  })
})
