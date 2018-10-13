const { getUserId } = require('../utils')

const Query = {
  me: (parent, args, ctx) => {
    return ctx.db.user({ id: getUserId(ctx) })
  },
  feed: (parent, args, ctx) => ctx.db.posts({ where: { isPublished: true } }),
  drafts: (parent, args, ctx) =>
    ctx.db.posts({ where: { isPublished: false } }),
  post: (parent, args, ctx) => ctx.db.post({ id: args.id }),
}

module.exports = {
  Query,
}
