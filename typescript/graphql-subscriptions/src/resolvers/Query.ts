export const Query = {
  feed: (parent, args, ctx) =>
    ctx.prisma.posts({ where: { isPublished: true } }),
  drafts: (parent, args, ctx) =>
    ctx.prisma.posts({ where: { isPublished: false } }),
  post: (parent, { id }, ctx) => ctx.prisma.post({ id }),
}
