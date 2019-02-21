import { prisma } from '../src/generated/prisma-client'

async function main() {
  await prisma.createTodo({ title: 'Subscribe to GraphQL Weekly' })
  await prisma.createTodo({ title: 'Join GraphQL Conf 2019' })
}

main()