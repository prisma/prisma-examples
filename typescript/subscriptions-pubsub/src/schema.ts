import { nexusPrismaPlugin } from 'nexus-prisma'
import * as nexus from '@nexus/schema'
import { join } from 'path'
import { Context } from './types'

const nexusPrisma = nexusPrismaPlugin({
  prismaClient: (ctx: Context) => ctx.prisma,
})

export const Post = nexus.objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.published()
    t.model.title()
    t.model.content()
  },
})
export const User = nexus.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.posts()
  },
})

export const Query = nexus.queryType({
  definition(t) {
    t.crud.users()
    t.crud.posts()
  },
})

export const Mutation = nexus.mutationType({
  definition(t) {
    t.field('createDraft', {
      type: 'Post',
      args: {
        title: nexus.stringArg(),
        content: nexus.stringArg({ nullable: true }),
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

export const Subscription = nexus.subscriptionField('latestPost', {
  type: 'Post',
  subscribe(_root, _args, ctx) {
    return ctx.pubsub.asyncIterator('latestPost')
  },
  resolve(payload) {
    return payload
  },
})

export const schema = nexus.makeSchema({
  types: [User, Post, Query, Mutation, Subscription],
  plugins: [nexusPrisma],
  outputs: {
    typegen: join(__dirname, 'generated', 'index.d.ts'),
    schema: join(__dirname, 'generated', 'schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: join(__dirname, 'types.ts'),
        alias: 'ctx',
      },
    ],
    contextType: 'ctx.Context',
  },
})
