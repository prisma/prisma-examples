import { testExample, testSqliteExample } from './fixtures.js'
import { describe, test } from 'vitest'

describe('ORM Examples', () => {
  testExample('orm/ai-sdk-nextjs')
  testExample('orm/astro')
  testExample('orm/betterauth-astro')
  testExample('orm/betterauth-nextjs')
  testExample('orm/clerk-astro')
  testExample('orm/clerk-nextjs')
  testExample('orm/cloudflare-workers')
  testExample('orm/express')
  testExample('orm/fastify')
  testExample('orm/fastify-graphql')
  testExample('orm/fastify-graphql-sdl-first')
  testExample('orm/graphql', { runBuild: true })
  testExample('orm/graphql-auth', { runBuild: true })
  testExample('orm/graphql-gqloom')
  testExample('orm/graphql-nexus', { runBuild: true })
  testExample('orm/graphql-sdl-first')
  testExample('orm/graphql-subscriptions', { runBuild: true })
  testExample('orm/hapi')
  testExample('orm/hapi-graphql', { runBuild: true })
  testExample('orm/hapi-graphql-sdl-first')
  testExample('orm/hono')
  testExample('orm/koa')
  testExample('orm/nest')
  testExample('orm/nest-graphql', { runBuild: true })
  testExample('orm/nest-graphql-sdl-first', { runBuild: true })
  testExample('orm/nextjs')
  testExample('orm/nextjs-graphql', { runBuild: true })
  testExample('orm/nextjs-trpc')
  testExample('orm/prisma-mocking-javascript')
  testExample('orm/react-router-7')
  testExample('orm/script', { skipSeed: true })
  testExample('orm/solid-start')
  testExample('orm/starter')
  testExample('orm/sveltekit')
  testExample('orm/testing-express')

  testSqliteExample('orm/typedsql', { generateSql: true })

  // Skipped examples
  describe('orm/authjs-nextjs', () => {
    test.skip('npm install has peer dependency conflicts', () => {})
  })

  describe('orm/elysia', () => {
    test.skip('requires Bun runtime', () => {})
  })

  describe('orm/grpc', () => {
    test.skip('grpc dependencies have issues', () => {})
  })

  describe('orm/graphql-typegraphql', () => {
    test.skip('README-only example (no runnable project)', () => {})
  })

  describe('orm/graphql-typegraphql-crud', () => {
    test.skip('README-only example (no runnable project)', () => {})
  })

  describe('orm/nuxt', () => {
    test.skip('requires special nuxt setup', () => {})
  })

  describe('orm/nuxt-prisma-module', () => {
    test.skip('requires special nuxt setup', () => {})
  })

  describe('orm/postgis-express', () => {
    test.skip('requires PostGIS extension', () => {})
  })

  describe('orm/remix', () => {
    test.skip('README-only example (no runnable project)', () => {})
  })
})
