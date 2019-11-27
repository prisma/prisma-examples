const { prisma } = require('../src/generated/prisma-client')

async function main() {
  await prisma.createTodo({ title: 'Subscribe to GraphQL Weekly' })
  await prisma.createTodo({ title: 'Get ticket for Prisma Day: prisma.io/day' })
}

main()
