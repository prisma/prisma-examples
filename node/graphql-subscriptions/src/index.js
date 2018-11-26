const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    feed: (parent, args, context) =>
      context.db.posts({ where: { published: true } }),
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
    author: (parent, args, context) =>
      context.db.post({ id: parent.id }).author(),
  },
  User: {
    posts: (parent, args, context) =>
      context.db.user({ id: parent.id }).posts(),
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db: prisma,
  },
})

server.start(() => console.log('Server is running on http://localhost:4000'))
