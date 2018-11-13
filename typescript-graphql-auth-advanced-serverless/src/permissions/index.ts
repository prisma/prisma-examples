import { rule, and, shield } from 'graphql-shield'
import { getUserId } from '../utils'

const rules = {
  isUser: rule()((_parent, args, ctx) => {
    const userId = getUserId(ctx)
    
    return !!userId
  }),
  validateAuthor: rule()(async (_parent, { authorEmail }, ctx) => {
    const userId = getUserId(ctx)
    const author = await ctx.db.user({
      id: userId,
    })

    return authorEmail === author.email
  }),
  isPostOwner: rule()(async (_parent, { id }, ctx) => {
    const userId = getUserId(ctx)
    const author = await ctx.db
      .post({
        id,
      })
      .author()

    return userId === author.id
  }),
}

export const permissions = shield({
  Query: {
    me: rules.isUser,
  },
  Mutation: {
    createDraft: and(rules.isUser, rules.validateAuthor),
    deletePost: rules.isPostOwner,
    publish: rules.isPostOwner,
  },
})
