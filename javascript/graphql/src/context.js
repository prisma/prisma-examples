const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createContext = async () => ({
  prisma: prisma,
})

module.exports = {
  createContext,
}
