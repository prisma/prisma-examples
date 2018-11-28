/* @flow */
import { Post_defaultResolvers } from '../generated/graphqlgen'
import type { Post_Resolvers } from '../generated/graphqlgen'

export const Post: Post_Resolvers = {
  ...Post_defaultResolvers,

  author: ({ id }, args, ctx, info) => {
    return ctx.prisma.post({ id }).author()
  },
}
