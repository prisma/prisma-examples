import { QueryResolvers } from '../generated/graphqlgen'

export const Query: QueryResolvers.Type = {
  feed: (parent, args, ctx) => ctx.prisma.posts({ where: { isPublished: true } }),
  drafts: (parent, args, ctx) =>
    ctx.prisma.posts({ where: { isPublished: false } }),
  post: (parent, { id }, ctx) => ctx.prisma.post({ id }),
}
