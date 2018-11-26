const { getUserId } = require('../utils')

const Query = {
  me: (parent, args, context) => {
    return context.db.user({ id: getUserId(context) })
  },
  feed: (parent, args, context) =>
    context.db.posts({ where: { published: true } }),
  drafts: (parent, args, context) =>
    context.db.posts({ where: { published: false } }),
  post: (parent, { id }, context) => context.db.post({ id }),
}

module.exports = {
  Query,
}
