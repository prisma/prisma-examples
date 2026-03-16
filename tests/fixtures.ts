import { describe, test, afterAll } from 'vitest'
import { startPrismaDevServer } from '@prisma/dev'
import { execa } from 'execa'
import * as fs from 'node:fs'
import * as path from 'node:path'

type Server = Awaited<ReturnType<typeof startPrismaDevServer>>

export interface TestExampleOptions {
  skipSeed?: boolean
  skipMigrate?: boolean
  runBuild?: boolean
}

export function testExample(examplePath: string, options?: TestExampleOptions) {
  describe(examplePath, () => {
    let server: Server

    afterAll(async () => {
      await server?.close()
    })

    test('prisma setup', async () => {
      server = await startPrismaDevServer({ databaseIdleTimeoutMillis: 300000 })
      const url = server.database.connectionString
      const databaseUrl = url.startsWith('postgres://')
        ? url.replace('postgres://', 'postgresql://')
        : url
      const cwd = path.join(process.cwd(), examplePath)
      const env = { ...process.env, DATABASE_URL: databaseUrl, DIRECT_URL: databaseUrl }
      const packageJsonPath = path.join(cwd, 'package.json')
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
      const scripts = packageJson.scripts ?? {}

      console.log(`\n[${examplePath}] Installing dependencies...`)
      await execa('npm', ['install'], { cwd, env, stdio: 'inherit' })

      console.log(`\n[${examplePath}] Running prisma generate...`)
      await execa('npx', ['prisma', 'generate'], { cwd, env, stdio: 'inherit' })

      if (!options?.skipMigrate) {
        console.log(`\n[${examplePath}] Running prisma db push...`)
        await execa('npx', ['prisma', 'db', 'push', '--accept-data-loss'], {
          cwd,
          env,
          stdio: 'inherit',
        })
      }

      // Check for seed in prisma.config.ts (Prisma v7+)
      const configPath = path.join(cwd, 'prisma.config.ts')
      if (!options?.skipSeed && fs.existsSync(configPath)) {
        const content = fs.readFileSync(configPath, 'utf-8')
        if (content.includes('seed:')) {
          console.log(`\n[${examplePath}] Running prisma db seed...`)
          await execa('npx', ['prisma', 'db', 'seed'], { cwd, env, stdio: 'inherit' })
        }
      }

      if (options?.runBuild && scripts.build) {
        console.log(`\n[${examplePath}] Running build...`)
        await execa('npm', ['run', 'build'], { cwd, env, stdio: 'inherit' })
      }

      console.log(`\n[${examplePath}] Completed successfully!`)
    })
  })
}

// For SQLite examples that don't need @prisma/dev server
export function testSqliteExample(
  examplePath: string,
  options?: { generateSql?: boolean; env?: NodeJS.ProcessEnv; runBuild?: boolean }
) {
  describe(examplePath, () => {
    test('prisma setup', async () => {
      const cwd = path.join(process.cwd(), examplePath)
      const env = { ...process.env, ...options?.env }
      const packageJsonPath = path.join(cwd, 'package.json')
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
      const scripts = packageJson.scripts ?? {}

      // Remove existing SQLite databases to ensure clean state
      const dbPaths = [path.join(cwd, 'dev.db'), path.join(cwd, 'prisma', 'dev.db')]
      for (const dbPath of dbPaths) {
        if (fs.existsSync(dbPath)) {
          fs.unlinkSync(dbPath)
        }
      }

      console.log(`\n[${examplePath}] Installing dependencies...`)
      await execa('npm', ['install'], { cwd, env, stdio: 'inherit' })

      console.log(`\n[${examplePath}] Running prisma generate...`)
      await execa('npx', ['prisma', 'generate'], { cwd, env, stdio: 'inherit' })

      console.log(`\n[${examplePath}] Running prisma db push...`)
      await execa('npx', ['prisma', 'db', 'push', '--accept-data-loss'], {
        cwd,
        env,
        stdio: 'inherit',
      })

      if (options?.generateSql) {
        console.log(`\n[${examplePath}] Running prisma generate --sql...`)
        await execa('npx', ['prisma', 'generate', '--sql'], { cwd, env, stdio: 'inherit' })
      }

      // Check for seed in prisma.config.ts (Prisma v7+)
      const configPath = path.join(cwd, 'prisma.config.ts')
      if (fs.existsSync(configPath)) {
        const content = fs.readFileSync(configPath, 'utf-8')
        if (content.includes('seed:')) {
          console.log(`\n[${examplePath}] Running prisma db seed...`)
          await execa('npx', ['prisma', 'db', 'seed'], { cwd, env, stdio: 'inherit' })
        }
      }

      if (options?.runBuild && scripts.build) {
        console.log(`\n[${examplePath}] Running build...`)
        await execa('npm', ['run', 'build'], { cwd, env, stdio: 'inherit' })
      }

      console.log(`\n[${examplePath}] Completed successfully!`)
    })
  })
}
