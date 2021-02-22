const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function createContext(req) {
  return {
    ...req,
    prisma,
  }
}

module.exports = {
  createContext: createContext,
}
