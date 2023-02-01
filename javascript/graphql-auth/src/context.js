const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createContext(req) {
  return {
    ...req,
    prisma,
  }
}

module.exports = {
  createContext,
}
