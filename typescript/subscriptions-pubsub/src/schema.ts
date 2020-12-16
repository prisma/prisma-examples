import {
  makeSchema,
  mutationType,
  nullable,
  objectType,
  queryType,
  stringArg,
  subscriptionField,
} from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { join } from 'path'
import { Context } from './types'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.published()
    t.model.title()
    t.model.content()
  },
})
export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.posts()
  },
})

export const Query = queryType({
  definition(t) {
    t.crud.users()
    t.crud.posts()
  },
})

export const Mutation = mutationType({
  definition(t) {
    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg(),
        content: nullable(stringArg()),
      },
      resolve: async (_parent, { title, content }, ctx) => {
        const newPost = await ctx.prisma.post.create({
          data: {
            title,
            content,
            published: false,
          },
        })

        // publish the subscription here
        ctx.pubsub.publish('latestPost', newPost)
        return newPost
      },
    })
  },
})

export const Subscription = subscriptionField('latestPost', {
  type: 'Post',
  subscribe(_root, _args, ctx) {
    return ctx.pubsub.asyncIterator('latestPost')
  },
  resolve(payload) {
    return payload
  },
})

export const schema = makeSchema({
  types: [User, Post, Query, Mutation, Subscription],
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
      prismaClient: (ctx: Context) => ctx.prisma,
    }),
  ],
  outputs: {
    typegen: join(__dirname, 'generated/index.d.ts'),
    schema: join(__dirname, 'generated/schema.graphql'),
  },
  contextType: {
    module: join(__dirname, 'types.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
