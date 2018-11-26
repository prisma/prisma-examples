const { getUserId } = require('../utils')

const Query = {
  me: (parent, args, context) => {
    return context.prisma.user({ id: getUserId(context) })
  },
  feed: (parent, args, context) => {
    return context.prisma.posts({ where: { published: true } })
  },
  filterPosts: (parent, args, context) => {
    return context.prisma.posts({ where: { OR: [] } })
  },
  post: (parent, { id }, context) => {
    return context.prisma.post({ id })
  },
}

module.exports = {
  Query,
}
