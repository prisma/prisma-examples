import 'dotenv/config'
import postgres from '@prisma/orm-postgres/runtime'

import service from '../service.js'
import type { Contract } from './contract.d.js'
import contractJson from './contract.json' with { type: 'json' }

let client: ReturnType<typeof postgres<Contract>> | undefined

export function getDb() {
  if (client) return client

  if (process.env.COMPOSER_DB_URL) {
    client = service.load().db.client
    return client
  }

  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is required')

  client = postgres<Contract>({ contractJson, url })
  return client
}
