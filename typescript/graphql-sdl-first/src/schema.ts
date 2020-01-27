import { makeExecutableSchema } from 'graphql-tools'
import { Context } from './context'

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
    feed: (parent, args, ctx: Context) => {
      return ctx.prisma.posts.findMany({
        where: { published: true },
      })
    },
    filterPosts: (parent, args, ctx: Context) => {
      return ctx.prisma.posts.findMany({
        where: {
          OR: [
            { title: { contains: args.searchString } },
            { content: { contains: args.searchString } },
          ],
        },
      })
    },
    post: (parent, args, ctx: Context) => {
      return ctx.prisma.posts.findOne({
        where: { id: Number(args.where.id) },
      })
    },
  },
  Mutation: {
    createDraft: (parent, args, ctx) => {
      return ctx.prisma.posts.create({
        data: {
          title: args.title,
          content: args.content,
          published: false,
          author: {
            connect: { email: args.authorEmail },
          },
        },
      })
    },
    deleteOnePost: (parent, args, ctx: Context) => {
      return ctx.prisma.posts.delete({
        where: { id: Number(args.where.id) },
      })
    },
    publish: (parent, args, ctx: Context) => {
      return ctx.prisma.posts.update({
        where: { id: Number(args.id) },
        data: { published: true },
      })
    },
    signupUser: (parent, args, ctx: Context) => {
      return ctx.prisma.users.create(args)
    },
  },
  User: {
    posts: (parent, args, ctx: Context) => {
      return ctx.prisma.users
        .findOne({
          where: { id: parent.id },
        })
        .posts()
    },
  },
  Post: {
    author: (parent, args, ctx: Context) => {
      return ctx.prisma.posts
        .findOne({
          where: { id: parent.id },
        })
        .author()
    },
  },
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})