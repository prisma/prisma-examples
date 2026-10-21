import {
  testExample,
  testSqliteExample,
  testTypecheckExample,
} from './fixtures.js'
import { describe, test } from 'vitest'

describe('Database Examples', () => {
  // PostgreSQL examples
  testExample('databases/prisma-postgres')
  testSqliteExample('databases/turso')

  // Other query builders and ORMs with Prisma Postgres
  testTypecheckExample('databases/drizzle-prisma-postgres')
  testTypecheckExample('databases/kysely-prisma-postgres')
  testTypecheckExample('databases/typeorm-prisma-postgres')

  // Skipped examples
  describe('databases/postgresql-supabase', () => {
    test.skip('requires Supabase setup', () => {})
  })

  describe('databases/cockroachdb', () => {
    test.skip('requires CockroachDB setup', () => {})
  })

  describe('databases/mongodb', () => {
    test.skip('requires MongoDB setup', () => {})
  })

  describe('databases/sql-server', () => {
    test.skip('requires SQL Server setup', () => {})
  })
})
