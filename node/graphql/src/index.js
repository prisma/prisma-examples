const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    feed: (parent, args, context) => {
      return context.db.posts({ where: { published: true } })
    },
    drafts: (parent, args, context) => {
      return context.db.posts({ where: { published: false } })
    },
    post: (parent, { id }, context) => {
      return context.db.post({ id })
    },
  },
  Mutation: {
    signupUser: (parent, { name, email }, context) => {
      return context.db.createUser({
        name,
        email,
      })
    },
    createDraft: (parent, { title, content, authorEmail }, context) => {
      return context.db.createPost({
        title,
        content,
        author: { connect: { email: authorEmail } },
      })
    },
    publish: (parent, { id }, context) => {
      return context.db.updatePost({
        where: { id },
        data: { published: true },
      })
    },
    deletePost: (parent, { id }, context) => {
      return context.db.deletePost({ id })
    },
  },
  Post: {
    author: (parent, args, context) => {
      return context.db.post({ id: parent.id }).author()
    },
  },
  User: {
    posts: (parent, args, context) => {
      return context.db.user({ id: parent.id }).posts()
    },
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
