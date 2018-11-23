const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { Subscription } = require('./Subscription')
const { Post } = require('./Post')
const { User } = require('./User')

const resolvers = {
  Query: {
    feed: (parent, args, context) => context.db.posts({ where: { published: true } }),
    drafts: (parent, args, context) =>
      context.db.posts({ where: { published: false } }),
    post: (parent, { id }, context) => context.db.post({ id }),
  },
  Mutation: {
    createDraft: (parent, { title, content }, context) => {
      return context.db.createPost({
        title,
        content,
      })
    },
    deletePost: (parent, { id }, context) => context.db.deletePost({ id }),
    publish: (parent, { id }, context) => {
      return context.db.updatePost({
        where: { id },
        data: { published: true },
      })
    },
  },
  Subscription: {
    posts: {
      subscribe: async (parent, args, context) => {
        return context.db.$subscribe
          .post({
            where: {
              mutation_in: ['CREATED', 'UPDATED'],
            },
          })
          .node()
      },
      resolve: payload => {
        return payload
      },
    },
  },
  Post: {
    author: (parent, args, context) => context.db.post({ id: parent.id }).author(),
  },
  User: {
    posts: (parent, args, context) => context.db.user({ id: parent.id }).posts(),
  }

}

module.exports = {
  resolvers,
}
