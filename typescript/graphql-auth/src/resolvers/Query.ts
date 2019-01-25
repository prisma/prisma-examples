import { prismaObjectType } from 'nexus-prisma'
import { getUserId } from '../utils'
import { stringArg, idArg } from 'nexus'

export const Query = prismaObjectType('Query', t => {
  t.field('me', 'User', {
    resolve: (parent, args, ctx) => {
      const userId = getUserId(ctx)
      return ctx.prisma.user({ id: userId })
    },
  })

  t.field('feed', 'Post', {
    list: true,
    resolve: (parent, args, ctx) => {
      console.log('Resovle feed')
      return ctx.prisma.posts({
        where: { published: true },
      })
    },
  })

  t.field('filterPosts', 'Post', {
    list: true,
    args: {
      searchString: stringArg({ nullable: true }),
    },
    resolve: (parent, { searchString }, ctx) => {
      return ctx.prisma.posts({
        where: {
          OR: [
            { title_contains: searchString },
            { content_contains: searchString },
          ],
        },
      })
    },
  })

  t.field('post', 'Post', {
    nullable: true,
    args: {
      id: idArg(),
    },
    resolve: (parent, { id }, ctx) => {
      return ctx.prisma.post({ id })
    },
  })
})
