const { PrismaClient } = require('./prisma/generated/client')
const { PrismaBetterSQLite3 } = require('@prisma/adapter-better-sqlite3')

const adapter = new PrismaBetterSQLite3({ url: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter });

module.exports = {
  prisma,
}
