import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
}

export const context: Context = {
  prisma: prisma,
}
