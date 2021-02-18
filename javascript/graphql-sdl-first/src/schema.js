/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @typedef { import("@prisma/client").UserCreateArgs } UserCreateArgs
 */

const { makeExecutableSchema } = require('apollo-server')

const typeDefs = `
type User {
  email: String!
  id: ID!
  name: String
  posts: [Post!]!
}

type Post {
  author: User
  content: String
  id: ID!
  published: Boolean!
  title: String!
}


type Query {
  feed: [Post!]!
  filterPosts(searchString: String): [Post!]!
  post(where: PostWhereUniqueInput!): Post
}

type Mutation {
  createDraft(authorEmail: String, content: String, title: String!): Post!
  deleteOnePost(where: PostWhereUniqueInput!): Post
  publish(id: ID): Post
  signupUser(data: UserCreateInput!): User!
}

input PostWhereUniqueInput {
  id: ID
}

input UserCreateInput {
  email: String!
  id: ID
  name: String
  posts: PostCreateManyWithoutPostsInput
}

input PostCreateManyWithoutPostsInput {
  connect: [PostWhereUniqueInput!]
  create: [PostCreateWithoutAuthorInput!]
}

input PostCreateWithoutAuthorInput {
  content: String
  id: ID
  published: Boolean
  title: String!
}
`

const resolvers = {
  Query: {
    /**
     * @param {any} parent
     * @param {any} args
     * @param {{ prisma: Prisma }} ctx
     */
    feed: (parent, args, ctx) => {
      return ctx.prisma.post.findMany({
        where: { published: true },
      })
    },
    /**
     * @param {any} parent
     * @param {{ searchString: string }} args
     * @param {{ prisma: Prisma }} ctx
     */
    filterPosts: (parent, args, ctx) => {
      return ctx.prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: args.searchString } },
            { content: { contains: args.searchString } },
          ],
        },
      })
    },
    /**
     * @param {any} parent
     * @param {{ where: { id: string }}} args
     * @param {{ prisma: Prisma }} ctx
     */
    post: (parent, args, ctx) => {
      return ctx.prisma.post.findUnique({
        where: { id: Number(args.where.id) },
      })
    },
  },
  Mutation: {
    /**
     * @param {any} parent
     * @param {{ title: string, content: string, authorEmail: (string|undefined) }} args
     * @param {{ prisma: Prisma }} ctx
     */
    createDraft: (parent, args, ctx) => {
      return ctx.prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          published: false,
          author: args.authorEmail && {
            connect: { email: args.authorEmail },
          },
        },
      })
    },
    /**
     * @param {any} parent
     * @param {{ where: { id: string }}} args
     * @param {{ prisma: Prisma }} ctx
     */
    deleteOnePost: (parent, args, ctx) => {
      return ctx.prisma.post.delete({
        where: { id: Number(args.where.id) },
      })
    },
    /**
     * @param {any} parent
     * @param {{ id: string }} args
     * @param {{ prisma: Prisma }} ctx
     */
    publish: (parent, args, ctx) => {
      return ctx.prisma.post.update({
        where: { id: Number(args.id) },
        data: { published: true },
      })
    },
    /**
     * @param {any} parent
     * @param {UserCreateArgs} args
     * @param {{ prisma: Prisma }} ctx
     */
    signupUser: (parent, args, ctx) => {
      return ctx.prisma.user.create(args)
    },
  },
  User: {
    /**
     * @param {{ id: number }} parent
     * @param {any} args
     * @param {{ prisma: Prisma }} ctx
     */
    posts: (parent, args, ctx) => {
      return ctx.prisma.user
        .findUnique({
          where: { id: parent.id },
        })
        .posts()
    },
  },
  Post: {
    /**
     * @param {{ id: number }} parent
     * @param {any} args
     * @param {{ prisma: Prisma }} ctx
     */
    author: (parent, args, ctx) => {
      return ctx.prisma.post
        .findUnique({
          where: { id: parent.id },
        })
        .author()
    },
  },
}

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

module.exports = {
  schema,
}
