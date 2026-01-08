import { describe, test } from 'vitest'

describe('databases/sql-server', () => {
  test.skip('disabled - requires SQL Server setup', async () => {
    // This test is disabled as it requires SQL Server docker setup
    // See .github/workflows/test-sql-server.yaml
  })
})
