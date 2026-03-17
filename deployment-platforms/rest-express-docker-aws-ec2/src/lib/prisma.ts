import { PrismaClient } from '../../prisma/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error('Missing DATABASE_URL environment variable')
}

const pool = new PrismaPg({ connectionString: databaseUrl })
export const prisma = new PrismaClient({ adapter: pool })
