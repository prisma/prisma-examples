const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    feed: (parent, args, context) => {
      return context.prisma.posts({ where: { published: true } })
    },
    post: (parent, { id }, context) => {
      return context.prisma.post({ id })
    },
  },
  Mutation: {
    createDraft: (parent, { title, content }, context) => {
      return context.prisma.createPost({
        title,
        content,
      })
    },
    deletePost: (parent, { id }, context) => context.prisma.deletePost({ id }),
    publish: (parent, { id }, context) => {
      return context.prisma.updatePost({
        where: { id },
        data: { published: true },
      })
    },
  },
  Subscription: {
    posts: {
      subscribe: async (parent, args, context) => {
        return context.prisma.$subscribe
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
    author: (parent, args, context) => {
      return context.prisma.post({ id: parent.id }).author()
    },
  },
  User: {
    posts: (parent, args, context) => {
      return context.prisma.user({ id: parent.id }).posts()
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma,
  },
})

server.start(() => console.log('Server is running on http://localhost:4000'))
