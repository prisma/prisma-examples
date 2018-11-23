const Query = {
  feed: (parent, args, ctx) => ctx.db.posts({ where: { published: true } }),
  drafts: (parent, args, ctx) =>
    ctx.db.posts({ where: { published: false } }),
  post: (parent, { id }, ctx) => ctx.db.post({ id }),
}

module.exports = {
  Query,
}
