/* @flow */
import type { Query_Resolvers } from '../generated/graphqlgen'

export const Query: Query_Resolvers = {
  feed: (parent, args, ctx, info) => {
    return ctx.prisma.posts({
      where: {
        published: true,
      },
    })
  },
  filterPosts: (parent, { searchString }, ctx, info) => {
    return ctx.prisma.posts({
      where: {
        OR: [{
          title_contains: searchString
        }, {
          content_contains: searchString
        }]
      }
    })
  },
  post: (parent, { id }, ctx, info) => {
    return ctx.prisma.post({ id })
  },
}
