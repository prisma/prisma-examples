const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export function createContext() {
  return { prisma }
}
