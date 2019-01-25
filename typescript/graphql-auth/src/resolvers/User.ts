import { prismaObjectType } from 'nexus-prisma'

export const User = prismaObjectType('User', t => {
  t.prismaFields([
    'id',
    'name',
    'email',
    {
      name: 'posts',
      args: [], // remove the arguments from the `posts` field of the `User` type in the Prisma schema
    },
  ])
})
