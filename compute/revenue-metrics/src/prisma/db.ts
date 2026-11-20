// The ORM maps timestamptz columns to Temporal.Instant; Node.js 22 has no global Temporal.
import 'temporal-polyfill/global'
import postgres from '@prisma/orm-postgres/runtime'
import { contractFromJson } from '@prisma/orm-postgres/static'
import { config } from 'dotenv'

import service from '../service'
import type { Contract } from './contract.d'
import contractJson from './contract.json' with { type: 'json' }

// Local settings come from .env.local, not .env: `next build` copies .env into
// the bundle that a deploy uploads. On Prisma Compute there is no file and
// Composer provides the database.
config({ path: '.env.local', quiet: true })

const contract = contractFromJson<Contract>(contractJson)

let client: ReturnType<typeof postgres<Contract>> | undefined

export function getDb() {
  if (client) return client

  if (process.env.COMPOSER_DB_URL) {
    client = service.load().db.client
    return client
  }

  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is required')

  client = postgres({ contract, url })
  return client
}
