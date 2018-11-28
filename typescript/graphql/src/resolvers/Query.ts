import { QueryResolvers } from '../generated/graphqlgen'

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,

  feed: (parent, args, ctx) => {
    return ctx.prisma.posts({
      where: {
        published: true,
      },
    })
  },
  filterPosts: (parent, { searchString }, ctx) => {
    return ctx.prisma.posts({
      where: {
        OR: [
          {
            title_contains: searchString,
          },
          {
            content_contains: searchString,
          },
        ],
      },
    })
  },
  post: (parent, { id }, ctx) => {
    return ctx.prisma.post({
      id,
    })
  },
}
