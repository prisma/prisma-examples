const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    feed: (parent, args, context, info) => {
      return context.prisma.query.posts({ where: { published: true } }, info)
    },
    filterPosts: (parent, { searchString }, context, info) => {
      return context.prisma.query.posts({
        where: {
          OR: [{
            title_contains: searchString
          }, {
            content_contains: searchString
          }]
        }
      }, info)
    },
    post: (parent, { id }, context, info) => {
      return context.prisma.query.post({ where: { id } }, info)
    },
  },
  Mutation: {
    signupUser: (parent, { email, name }, context, info) => {
      return context.prisma.mutation.createUser({
        data: {
          email,
          name,
        }
      }, info)
    },
    createDraft: (parent, { title, content, authorEmail }, context, info) => {
      return context.prisma.mutation.createPost(
        {
          data: {
            title,
            content,
            author: { connect: { email: authorEmail } },
          },
        },
        info,
      )
    },
    deletePost: (parent, { id }, context, info) => {
      return context.prisma.mutation.deletePost(
        {
          where: {
            id,
          },
        },
        info,
      )
    },
    publish: (parent, { id }, context, info) => {
      return context.prisma.mutation.updatePost(
        {
          where: {
            id,
          },
          data: { published: true },
        },
        info,
      )
    },
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma: new Prisma({
      typeDefs: './src/generated/prisma.graphql',
      endpoint: '__YOUR_PRISMA_ENDPOINT__',
    }),
  }
})

server.start(() => console.log('Server is running on http://localhost:4000'))
