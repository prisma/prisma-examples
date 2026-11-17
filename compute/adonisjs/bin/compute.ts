/*
|--------------------------------------------------------------------------
| Prisma Compute entrypoint
|--------------------------------------------------------------------------
|
| Prisma Compute starts this file instead of "server.ts". It copies what
| the platform provides (the database URL, the port and the app key) into
| the environment variables AdonisJS validates in "start/env.ts", applies
| pending migrations, and then starts the HTTP server.
|
*/

import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import service from '../service.ts'

const { db } = service.load()

process.env.NODE_ENV = 'production'
process.env.HOST = '0.0.0.0'
process.env.PORT = String(service.port())
process.env.APP_KEY = service.input().appKey.expose()
process.env.DATABASE_URL = db.url
process.env.LOG_LEVEL ??= 'info'
process.env.SESSION_DRIVER ??= 'cookie'

/**
 * Prisma Compute starts the server from another directory, and AdonisJS
 * resolves a few paths, such as the Vite manifest, from the working one.
 */
process.chdir(fileURLToPath(new URL('../', import.meta.url)))

/**
 * A deploy does not run Lucid migrations, so apply them before the server
 * accepts requests. Lucid takes a database lock while it migrates, which
 * makes this safe when several instances start at once.
 */
const migrate = spawnSync(process.execPath, ['ace.js', 'migration:run', '--force'], {
  stdio: 'inherit',
})

if (migrate.status !== 0) {
  process.exit(migrate.status ?? 1)
}

await import('./server.js')
