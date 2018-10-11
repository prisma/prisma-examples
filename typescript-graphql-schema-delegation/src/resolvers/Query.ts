export const Query = {
  feed: (_parent, _args, ctx, info) => {
    return ctx.binding.query.posts({ where: { isPublished: true } }, info)
  },
  drafts: (_parent, _args, ctx, info) => {
    return ctx.binding.query.posts({ where: { isPublished: false } }, info)
  },
  post: (_parent, args, ctx, info) => {
    return ctx.binding.query.post({ where: { id: args.id } }, info)
  },
}
