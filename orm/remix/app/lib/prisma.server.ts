// lib/prisma.ts
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const getPrismaClient = () => {
  return new PrismaClient().$extends(withAccelerate())
}

const globalForPrisma = global as unknown as {
  prisma: ReturnType<typeof getPrismaClient>
}
export const prisma = globalForPrisma.prisma || getPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
