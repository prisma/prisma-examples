const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function createContext(): Context {
  return { prisma }
}

module.exports = {
  createContext
}