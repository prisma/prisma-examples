import { PrismaClient } from './generated/prisma'

export interface Context {
  prisma: PrismaClient
}

const prisma = new PrismaClient()

export const context: Context = {
  prisma: prisma,
}
