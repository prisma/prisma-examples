import { PrismaClient } from './generated/prisma'

export interface Context {
  prisma: PrismaClient
}

const prisma = new PrismaClient()

export const createContext = async () => ({
  prisma: prisma,
})
