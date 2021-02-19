import { intArg, nullable, queryType, stringArg } from 'nexus'
import { getUserId } from '../utils'

export const Query = queryType({
  definition(t) {
    t.nullable.field('me', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.prisma.user.findUnique({
          where: {
            id: Number(userId),
          },
        })
      },
    })

    t.list.field('feed', {
      type: 'Post',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.post.findMany({
          where: { published: true },
        })
      },
    })

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: nullable(stringArg()),
      },
      resolve: (parent, { searchString }, ctx) => {
        return ctx.prisma.post.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: searchString || undefined,
                },
              },
              {
                content: {
                  contains: searchString ?? undefined,
                },
              },
            ],
          },
        })
      },
    })

    t.nullable.field('post', {
      type: 'Post',
      args: { id: intArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.post.findUnique({
          where: {
            id: Number(id),
          },
        })
      },
    })
  },
})
