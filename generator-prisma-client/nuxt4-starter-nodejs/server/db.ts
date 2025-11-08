import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../shared/generated/prisma/client'
import 'dotenv/config'

export type GetDbParams = {
  connectionString: string
}

export function getDb({ connectionString }: GetDbParams) {
  const pool = new PrismaPg({ connectionString })
  const prisma = new PrismaClient({ adapter: pool })

  return prisma
}

const prisma = getDb({ connectionString: process.env.DATABASE_URL! })
export default prisma
