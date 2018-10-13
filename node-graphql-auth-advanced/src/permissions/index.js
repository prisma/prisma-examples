const { rule, and, shield } = require('graphql-shield')

const {
  getUserId,
} = require('../utils')

const rules = {
  isUser: rule()((parent, args, ctx) => {
    const userId = getUserId(ctx)
    return !!userId;
  }),
  isAuthor: rule()(async (parent, args, ctx, info) => {
   const email = args.authorEmail
   const userId = getUserId(ctx)
   const author = await ctx.db.user({
     id: userId
   });

   return email === author.email;
 }),
  isPostOwner: rule()(async (parent, args, ctx, info) => {
   const postId = args.id
   const userId = getUserId(ctx)
   const author = await ctx.db.post({
     id: postId
   }).author();

   return userId === author.id;
 }),
}


const permissions = shield({
  Query: {
    me: rules.isUser,
  },
  Mutation: {
    createDraft: and(rules.isUser, rules.isAuthor),
    deletePost: rules.isPostOwner,
    publish: rules.isPostOwner,
  },
})

module.exports = {
  permissions
}
