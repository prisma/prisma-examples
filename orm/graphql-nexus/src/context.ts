import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())
export interface Context {
  prisma: typeof prisma
}

export const createContext = async () => ({
  prisma: prisma,
})
