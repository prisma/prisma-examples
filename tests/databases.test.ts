import { testExample } from './fixtures.js'
import { describe, test } from 'vitest'

// PostgreSQL examples
testExample('databases/prisma-postgres')

// Skipped examples
describe('databases/postgresql-supabase', () => {
  test.skip('requires Supabase setup', () => {})
})

describe('databases/sql-server', () => {
  test.skip('requires SQL Server setup', () => {})
})
