const { getUserId } = require('../utils')

const Query = {
  me: (parent, args, ctx) => {
    return ctx.db.user({ id: getUserId(ctx) })
  },
  feed: (parent, args, ctx) => ctx.db.posts({ where: { published: true } }),
  drafts: (parent, args, ctx) =>
    ctx.db.posts({ where: { published: false } }),
  post: (parent, { id }, ctx) => ctx.db.post({ id }),
}

module.exports = {
  Query,
}
