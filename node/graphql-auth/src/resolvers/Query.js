const { getUserId } = require('../utils')

const Query = {
  me: (parent, args, context) => {
    return context.prisma.user({ id: getUserId(context) })
  },
  feed: (parent, args, context) =>
    context.prisma.posts({ where: { published: true } }),
  drafts: (parent, args, context) =>
    context.prisma.posts({ where: { published: false } }),
  post: (parent, { id }, context) => context.prisma.post({ id }),
}

module.exports = {
  Query,
}
