import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import * as path from 'path'
import { makePrismaSchema, prismaObjectType } from 'nexus-prisma'
import { stringArg, idArg } from 'nexus'

const Post = prismaObjectType('Post')
const User = prismaObjectType('User', t => {
  t.prismaFields([
    'id',
    'name',
    'email',
    {
      name: 'posts',
      args: [], // remove the arguments from the `posts` field of the `User` type in the Prisma schema
    },
  ])
})

const Query = prismaObjectType('Query', t => {
  t.field('feed', 'Post', {
    list: true,
    resolve: (parent, args, ctx) => {
      return ctx.prisma.posts({
        where: { published: true },
      })
    },
  })

  t.field('filterPosts', 'Post', {
    list: true,
    args: {
      searchString: stringArg({ nullable: true }),
    },
    resolve: (parent, { searchString }, ctx) => {
      return ctx.prisma.posts({
        where: {
          OR: [
            { title_contains: searchString },
            { content_contains: searchString },
          ],
        },
      })
    },
  })

  t.field('post', 'Post', {
    nullable: true,
    args: {
      id: idArg(),
    },
    resolve: (parent, { id }, ctx) => {
      return ctx.prisma.post({ id })
    },
  })
})

const Mutation = prismaObjectType('Mutation', t => {
  t.field('signupUser', 'User', {
    args: {
      name: stringArg({ nullable: true }),
      email: stringArg(),
    },
    resolve: (parent, { name, email }, ctx) => {
      return ctx.prisma.createUser({
        name,
        email,
      })
    },
  })

  t.field('createDraft', 'Post', {
    args: {
      title: stringArg(),
      content: stringArg({ nullable: true }),
      authorEmail: stringArg(),
    },
    resolve: (parent, { title, content, authorEmail }, ctx) => {
      return ctx.prisma.createPost({
        title,
        content,
        author: {
          connect: { email: authorEmail },
        },
      })
    },
  })

  t.field('deletePost', 'Post', {
    nullable: true,
    args: {
      id: idArg(),
    },
    resolve: (parent, { id }, ctx) => {
      return ctx.prisma.deletePost({ id })
    },
  })

  t.field('publish', 'Post', {
    nullable: true,
    args: {
      id: idArg(),
    },
    resolve: (parent, { id }, ctx) => {
      return ctx.prisma.updatePost({
        where: { id },
        data: { published: true },
      })
    },
  })
})

export const schema = makePrismaSchema({
  // Provide all the GraphQL types we've implemented
  types: [Query, Mutation, User, Post],

  // Configure the interface to Prisma
  prisma: {
    schemaPath: path.join(__dirname, './generated/prisma.graphql'),
    contextClientName: 'prisma',
  },

  // Specify where Nexus should put the generated files
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },

  // Configure nullability of input arguments: All arguments are non-nullable by default
  nullability: {
    input: false,
    inputList: false,
  },

  // Configure automatic type resolution for the TS representations of the associated types
  typegenAutoConfig: {
    sources: [
      {
        module: path.join(__dirname, './generated/prisma-client/index.ts'),
        alias: 'prisma',
      },
      {
        module: path.join(__dirname, './types.ts'),
        alias: 'types',
      },
    ],
    contextType: 'types.Context',
  },
})

const server = new GraphQLServer({
  schema,
  context: { prisma },
})

server.start(() => console.log(`🚀 Server ready at http://localhost:4000`))
