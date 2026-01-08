import { execa } from 'execa'
import * as fs from 'node:fs'
import * as path from 'node:path'

export interface RunExampleOptions {
  skipSeed?: boolean
  skipMigrate?: boolean
}

export async function runExample(
  examplePath: string,
  databaseUrl: string,
  options: RunExampleOptions = {},
): Promise<void> {
  const cwd = path.join(process.cwd(), examplePath)
  const env = { ...process.env, DATABASE_URL: databaseUrl }

  console.log(`\n[${examplePath}] Installing dependencies...`)
  await execa('npm', ['install'], { cwd, env, stdio: 'inherit' })

  console.log(`\n[${examplePath}] Running prisma generate...`)
  await execa('npx', ['prisma', 'generate'], { cwd, env, stdio: 'inherit' })

  if (!options.skipMigrate) {
    console.log(`\n[${examplePath}] Running prisma db push...`)
    await execa('npx', ['prisma', 'db', 'push', '--accept-data-loss'], {
      cwd,
      env,
      stdio: 'inherit',
    })
  }

  // Check for seed configuration in prisma.config.ts (Prisma v7+)
  const configPath = path.join(cwd, 'prisma.config.ts')
  let hasSeed = false

  if (fs.existsSync(configPath)) {
    const configContent = fs.readFileSync(configPath, 'utf-8')
    // Check if seed is configured in migrations.seed
    hasSeed = configContent.includes('seed:') || configContent.includes('seed :')
  }

  if (!options.skipSeed && hasSeed) {
    console.log(`\n[${examplePath}] Running prisma db seed...`)
    await execa('npx', ['prisma', 'db', 'seed'], { cwd, env, stdio: 'inherit' })
  }

  console.log(`\n[${examplePath}] Completed successfully!`)
}
