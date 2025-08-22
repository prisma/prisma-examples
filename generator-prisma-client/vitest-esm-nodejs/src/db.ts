import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from './generated/prisma/client'

export type { PrismaClient } from './generated/prisma/client'

export type GetDbParams = {
  connectionString: string
}

export function getDb({ connectionString }: GetDbParams) {
  const pool = new PrismaBetterSQLite3({ url: connectionString })
  const prisma = new PrismaClient({ adapter: pool })

  return prisma
}
