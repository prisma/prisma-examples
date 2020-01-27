const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function createContext() {
  return { prisma }
}

module.exports = {
  createContext
}
