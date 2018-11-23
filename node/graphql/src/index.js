const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    feed: (parent, args, context) => {
      return context.db.posts({ where: { published: true } })
    },
    filterPosts: (parent, { searchString }, context) => {
      return context.db.posts({
        where: {
          OR: [{
            title_contains: searchString
          }, {
            content_contains: searchString
          }]
        }
      })
    },
    post: (parent, { id }, context) => {
      return context.db.post({ id })
    },
  },
  Mutation: {
    signupUser: (parent, { email, name }, context) => {
      return context.db.createUser({
        email,
        name,
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
    author: ({ id }, args, context) => {
      return context.db.post({ id }).author()
    },
  },
  User: {
    posts: ({ id }, args, context) => {
      return context.db.user({ id }).posts()
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
