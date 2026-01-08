import { describe, test } from 'vitest'
import { execa } from 'execa'
import * as path from 'node:path'
import * as fs from 'node:fs'

describe('orm/typedsql', () => {
  test('prisma setup and build', async () => {
    const cwd = path.join(process.cwd(), 'orm/typedsql')

    // Remove existing SQLite database to ensure clean state
    const dbPath = path.join(cwd, 'dev.db')
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath)
    }

    console.log('\n[orm/typedsql] Installing dependencies...')
    await execa('npm', ['install'], { cwd, stdio: 'inherit' })

    console.log('\n[orm/typedsql] Running prisma generate...')
    await execa('npx', ['prisma', 'generate'], { cwd, stdio: 'inherit' })

    console.log('\n[orm/typedsql] Running prisma db push...')
    await execa('npx', ['prisma', 'db', 'push', '--accept-data-loss'], {
      cwd,
      stdio: 'inherit',
    })

    console.log('\n[orm/typedsql] Running prisma generate --sql...')
    await execa('npx', ['prisma', 'generate', '--sql'], {
      cwd,
      stdio: 'inherit',
    })

    console.log('\n[orm/typedsql] Running prisma db seed...')
    await execa('npx', ['prisma', 'db', 'seed'], { cwd, stdio: 'inherit' })

    console.log('\n[orm/typedsql] Completed successfully!')
  })
})
