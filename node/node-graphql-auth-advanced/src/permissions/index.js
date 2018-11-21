const { rule, and, shield } = require('graphql-shield')

const { getUserId } = require('../utils')

const rules = {
  isUser: rule()((parent, args, ctx) => {
    const userId = getUserId(ctx)
    
    return !!userId
  }),
  validateAuthor: rule()(async (parent, { authorEmail }, ctx) => {
    const userId = getUserId(ctx)
    const author = await ctx.db.user({
      id: userId,
    })

    return authorEmail === author.email
  }),
  isPostOwner: rule()(async (parent, { id }, ctx) => {
    const userId = getUserId(ctx)
    const author = await ctx.db
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
    createDraft: and(rules.isUser, rules.validateAuthor),
    deletePost: rules.isPostOwner,
    publish: rules.isPostOwner,
  },
})

module.exports = {
  permissions,
}
