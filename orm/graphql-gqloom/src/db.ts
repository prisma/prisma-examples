import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
export const prisma = new PrismaClient({ adapter }).$extends(withAccelerate())
