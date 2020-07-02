import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import { intArg, makeSchema, objectType, stringArg } from '@nexus/schema'
import { seedUsers } from './seed'

import path from 'path'

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.posts({
      pagination: false,
    })
  },
})

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.content()
    t.model.published()
    t.model.author()
    t.model.authorId()
  },
})

const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.model.id()
    t.model.bio()
    t.model.user()
    t.model.userId()
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.post()
    t.crud.profile()
    t.crud.users()

    t.list.field('allProfiles', {
      type: 'Profile',
      resolve: (_, args, ctx) => {
        return ctx.prisma.profile.findMany()
      },
    })

    t.list.field('feed', {
      type: 'Post',
      resolve: (_, args, ctx) => {
        return ctx.prisma.post.findMany({
          where: { published: true },
        })
      },
    })

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: stringArg({ required: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } },
            ],
          },
        })
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'signupUser' })
    t.crud.deleteOnePost()

    t.list.field('seed', {
      type: 'User',
      resolve: async (_, args, ctx) => {
        await ctx.prisma.post.deleteMany({})
        await ctx.prisma.profile.deleteMany({})
        await ctx.prisma.user.deleteMany({})

        const createdUsers = []
        for (const userData of seedUsers) {
          const createdUser = await ctx.prisma.user.create({
            data: userData,
            include: { posts: true },
          })
          createdUsers.push(createdUser)
        }

        return createdUsers
      },
    })

    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
        authorEmail: stringArg({ required: true }),
      },
      resolve: (_, { title, content, authorEmail }, ctx) => {
        return ctx.prisma.post.create({
          data: {
            title,
            content,
            published: false,
            author: {
              connect: { email: authorEmail },
            },
          },
        })
      },
    })

    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: {
        id: intArg(),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.post.update({
          where: { id: Number(id) },
          data: { published: true },
        })
      },
    })
  },
})

const generateArtifacts = Boolean(process.env.GENERATE_ARTIFACTS)

export const schema = makeSchema({
  types: [Query, Mutation, Post, User, Profile],
  plugins: [
    nexusSchemaPrisma({
      experimentalCRUD: true,
      shouldGenerateArtifacts: generateArtifacts,
      outputs: {
        typegen: path.join(__dirname, '/generated/prisma-nexus.ts'),
      },
    }),
  ],
  shouldGenerateArtifacts: generateArtifacts,
  outputs: {
    schema: path.join(__dirname, '/../../schema.graphql'),
    typegen: path.join(__dirname, '/generated/nexus.ts'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
