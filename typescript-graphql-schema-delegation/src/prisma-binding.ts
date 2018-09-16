import { Prisma } from 'prisma-binding'
import { typeDefs } from './generated/prisma-client/prisma-schema'

export const prismaBinding = new Prisma({
  typeDefs,
  endpoint: 'http://localhost:4466',
})
