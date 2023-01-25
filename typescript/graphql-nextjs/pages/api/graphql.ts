import { createYoga } from 'graphql-yoga'
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { DateTimeResolver } from 'graphql-scalars'

import type PrismaTypes from "@pothos/plugin-prisma/generated";
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../lib/prisma'

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  }
})

builder.queryType({})

builder.mutationType({})

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    name: t.exposeString('name', { nullable: true }),
    posts: t.relation("posts")
  })
})

builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    content: t.exposeString('content', { nullable: true }),
    published: t.exposeBoolean('published'),
    author: t.relation('author')
  })
})

builder.queryField('feed', (t) =>
  t.prismaField({
    type: ['Post'],
    resolve: async (query, _parent, _args, _info) =>
      prisma.post.findMany({
        ...query,
        where: { published: true }
      })
  })
)

builder.queryField('post', (t) =>
  t.prismaField({
    type: 'Post',
    args: {
      id: t.arg.id({ required: true }),
    },
    nullable: true,
    resolve: async (query, _parent, args, _info) =>
      prisma.post.findUnique({
        ...query,
        where: {
          id: Number(args.id)
        }
      })
  })
)

builder.queryField('drafts', (t) =>
  t.prismaField({
    type: ['Post'],
    resolve: async (query, _parent, _args, _info) =>
      prisma.post.findMany({
        ...query,
        where: { published: false }
      })
  })
)

builder.queryField('filterPosts', (t) =>
  t.prismaField({
    type: ['Post'],
    args: {
      searchString: t.arg.string({ required: false })
    },
    resolve: async (query, _parent, args, _info) => {
      const or = args.searchString
        ? {
          OR: [
            { title: { contains: args.searchString } },
            { content: { contains: args.searchString } },
          ],
        }
        : {}
      return prisma.post.findMany({
        ...query,
        where: { ...or }
      })
    }
  })
)

builder.mutationField('signupUser', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      name: t.arg.string({ required: false }),
      email: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.user.create({
        ...query,
        data: {
          email: args.email,
          name: args.name
        }
      })
  })
)

builder.mutationField('deletePost', (t) =>
  t.prismaField({
    type: 'Post',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.post.delete({
        ...query,
        where: {
          id: Number(args.id),
        }
      })
  })
)

builder.mutationField('publish', (t) =>
  t.prismaField({
    type: 'Post',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.post.update({
        ...query,
        where: {
          id: Number(args.id),
        },
        data: {
          published: true,
        }
      })
  })
)

builder.mutationField('createDraft', (t) =>
  t.prismaField({
    type: 'Post',
    args: {
      title: t.arg.string({ required: true }),
      content: t.arg.string(),
      authorEmail: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.post.create({
        ...query,
        data: {
          title: args.title,
          content: args.content,
          author: {
            connect: { email: args.authorEmail }
          }
        }
      })
  })
)

const schema = builder.toSchema()

export default createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema,
  graphqlEndpoint: '/api/graphql'
})

export const config = {
  api: {
    bodyParser: false
  }
}