const Query = {
  feed: (parent, args, ctx, info) => {
    return ctx.binding.query.posts({ where: { isPublished: true } }, info)
  },
  drafts: (parent, args, ctx, info) => {
    return ctx.binding.query.posts({ where: { isPublished: false } }, info)
  },
  post: (parent, args, ctx, info) => {
    return ctx.binding.query.post({ where: { id: args.id } }, info)
  },
}

module.exports = {
  Query,
}
