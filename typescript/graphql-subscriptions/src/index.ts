import { GraphQLServer } from 'graphql-yoga'
import { PubSub } from 'graphql-subscriptions'
import {
  idArg,
  queryType,
  stringArg,
  objectType,
  subscriptionField,
} from 'nexus'
import { makePrismaSchema, prismaObjectType } from 'nexus-prisma'
import * as path from 'path'

import mapAsyncIterator from './mapAsyncIterator'

import { prisma, Post } from './generated/prisma-client'
import datamodelInfo from './generated/nexus-prisma'

const pubsub = new PubSub()

type PostTopicEvent = 'draft' | 'publish' | 'delete'
const PostTopic = {
  identifier: 'POST_CHANGE_TOPIC',
  publish: (post: Post, event: PostTopicEvent) => {
    pubsub.publish(PostTopic.identifier, { post, event })
  },
  asyncIterator: () => {
    return mapAsyncIterator(
      pubsub.asyncIterator<{ post: Post; event: PostTopicEvent }>(
        PostTopic.identifier,
      ),
      value => {
        console.log('Event reason: ', value.event)
        return value.post
      },
    )
  },
}

const Post = prismaObjectType({
  name: 'Post',
  definition(t) {
    t.prismaFields(['*'])
  },
})

const Query = queryType({
  definition(t) {
    t.list.field('feed', {
      type: 'Post',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.posts({
          where: { published: true },
        })
      },
    })
  },
})

const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg(),
        content: stringArg({ nullable: true }),
      },
      resolve: async (parent, { title, content }, ctx) => {
        const post = await ctx.prisma.createPost({
          title,
          content,
        })
        if (post) {
          PostTopic.publish(post, 'draft')
        }
        return post
      },
    })

    t.field('deletePost', {
      type: 'Post',
      nullable: true,
      args: {
        id: idArg(),
      },
      resolve: async (parent, { id }, ctx) => {
        const post = await ctx.prisma.deletePost({ id })
        if (post) {
          PostTopic.publish(post, 'delete')
        }
        return post
      },
    })

    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: {
        id: idArg(),
      },
      resolve: async (parent, { id }, ctx) => {
        const post = await ctx.prisma.updatePost({
          where: { id },
          data: { published: true },
        })
        if (post) {
          PostTopic.publish(post, 'publish')
        }
        return post
      },
    })
  },
})

// This creates a global Subscription type that has a field post which yields an async iterator
export const SubscriptionPost = subscriptionField('posts', {
  type: 'Post',
  subscribe(root, args, ctx) {
    return PostTopic.asyncIterator()
  },
  resolve(payload) {
    return payload
  },
})

const schema = makePrismaSchema({
  // Provide all the GraphQL types we've implemented
  types: [Query, Mutation, Post, SubscriptionPost],

  // Configure the interface to Prisma
  prisma: {
    datamodelInfo,
    client: prisma,
  },

  // Specify where Nexus should put the generated files
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },

  // Configure nullability of input arguments: All arguments are non-nullable by default
  nonNullDefaults: {
    input: false,
    output: false,
  },

  // Configure automatic type resolution for the TS representations of the associated types
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(__dirname, './types.ts'),
        alias: 'types',
      },
    ],
    contextType: 'types.Context',
  },
})

const server = new GraphQLServer({
  schema,
  context: {
    prisma,
    pubsub,
  },
} as any)

server.start(() => console.log('Server is running on http://localhost:4000'))
