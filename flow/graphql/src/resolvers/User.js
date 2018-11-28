/* @flow */
import { User_defaultResolvers } from '../generated/graphqlgen'
import type { User_Resolvers } from '../generated/graphqlgen'

export const User: User_Resolvers = {
  ...User_defaultResolvers,

  posts: ({ id }, args, ctx, info) => {
    return ctx.prisma.user({ id }).posts()
  },
}
