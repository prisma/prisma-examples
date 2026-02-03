import { testExample, testSqliteExample } from './fixtures.js'
import { describe, test } from 'vitest'

describe.concurrent('Database Examples', () => {
  // PostgreSQL examples
  testExample('databases/prisma-postgres')
  testSqliteExample('databases/turso')

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
