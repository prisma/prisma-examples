import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '#shared/generated/prisma/client'

// Global database instance for server-side usage
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  (() => {
    const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
    return new PrismaClient({ adapter: pool })
  })()

// Store in global for both development and production
globalForPrisma.prisma = prisma

export default prisma
