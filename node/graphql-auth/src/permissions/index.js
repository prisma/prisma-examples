const { rule, and, shield } = require('graphql-shield')

const { getUserId } = require('../utils')

const rules = {
  isUser: rule()((parent, args, context) => {
    const userId = getUserId(context)

    return !!userId
  }),
  validateAuthor: rule()(async (parent, { authorEmail }, context) => {
    const userId = getUserId(context)
    const author = await context.prisma.user({
      id: userId,
    })

    return authorEmail === author.email
  }),
  isPostOwner: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context)
    const author = await context.prisma
      .post({
        id,
      })
      .author()

    return userId === author.id
  }),
}

const permissions = shield({
  Query: {
    me: rules.isUser,
  },
  Mutation: {
    createDraft: rules.isUser,
    deletePost: rules.isPostOwner,
    publish: rules.isPostOwner,
  },
})

module.exports = {
  permissions,
}
