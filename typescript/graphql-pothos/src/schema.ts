import { builder } from './builder'
import { prisma } from './db'

builder.queryType({
  fields: (t) => ({
    allUsers: t.prismaField({
      type: ['User'],
      resolve: (query) => prisma.user.findMany({ ...query }),
    }),
    postById: t.prismaField({
      type: 'Post',
      nullable: true,
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: (query, parent, args) =>
        prisma.post.findUnique({
          ...query,
          where: { id: args.id },
        }),
    }),
    feed: t.prismaField({
      type: ['Post'],
      args: {
        searchString: t.arg.string(),
        skip: t.arg.int(),
        take: t.arg.int(),
        orderBy: t.arg({
          type: PostOrderByUpdatedAtInput,
        }),
      },
      resolve: (query, parent, args) => {
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
          where: {
            published: true,
            ...or,
          },
          take: args.take ?? undefined,
          skip: args.skip ?? undefined,
          orderBy: args.orderBy ?? undefined,
        })
      },
    }),
    draftsByUser: t.prismaField({
      type: ['Post'],
      nullable: true,
      args: {
        userUniqueInput: t.arg({
          type: UserUniqueInput,
          required: true,
        }),
      },
      resolve: (query, parent, args) => {
        return prisma.user
          .findUnique({
            where: {
              id: args.userUniqueInput.id ?? undefined,
              email: args.userUniqueInput.email ?? undefined,
            },
          })
          .posts({
            ...query,
            where: {
              published: false,
            },
          })
      },
    }),
  }),
})

builder.mutationType({
  fields: (t) => ({
    signupUser: t.prismaField({
      type: 'User',
      args: {
        data: t.arg({
          type: UserCreateInput,
          required: true,
        }),
      },
      resolve: (query, parent, args) => {
        return prisma.user.create({
          ...query,
          data: {
            email: args.data.email,
            name: args.data.name,
            posts: {
              create: (args.data.posts ?? []).map((post) => ({
                title: post.title,
                content: post.content ?? undefined,
              })),
            },
          },
        })
      },
    }),
    createDraft: t.prismaField({
      type: 'Post',
      args: {
        data: t.arg({
          type: PostCreateInput,
          required: true,
        }),
        authorEmail: t.arg.string({ required: true }),
      },
      resolve: (query, parent, args) => {
        return prisma.post.create({
          ...query,
          data: {
            title: args.data.title,
            content: args.data.content ?? undefined,
            published: false,
            author: {
              connect: {
                email: args.authorEmail,
              },
            },
          },
        })
      },
    }),
    publishPost: t.prismaField({
      type: 'Post',
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: (query, parent, args) => {
        return prisma.post.update({
          ...query,
          where: { id: args.id },
          data: { published: true },
        })
      },
    }),
    incrementPostViewCount: t.prismaField({
      type: 'Post',
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: (query, parent, args) => {
        return prisma.post.update({
          ...query,
          where: { id: args.id },
          data: {
            viewCount: {
              increment: 1,
            },
          },
        })
      },
    }),
    deletePost: t.prismaField({
      type: 'Post',
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: (query, parent, args) => {
        return prisma.post.delete({
          ...query,
          where: { id: args.id },
        })
      },
    }),
  }),
})

const SortOrder = builder.enumType('SortOrder', {
  values: ['asc', 'desc'] as const,
})

const PostOrderByUpdatedAtInput = builder.inputType(
  'PostOrderByUpdatedAtInput',
  {
    fields: (t) => ({
      updatedAt: t.field({
        type: SortOrder,
        required: true,
      }),
    }),
  },
)

const UserUniqueInput = builder.inputType('UserUniqueInput', {
  fields: (t) => ({
    id: t.int(),
    email: t.string(),
  }),
})

const PostCreateInput = builder.inputType('PostCreateInput', {
  fields: (t) => ({
    title: t.string({ required: true }),
    content: t.string(),
  }),
})

const UserCreateInput = builder.inputType('UserCreateInput', {
  fields: (t) => ({
    email: t.string({ required: true }),
    name: t.string(),
    posts: t.field({ type: [PostCreateInput] }),
  }),
})

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name', { nullable: true }),
    email: t.exposeString('email'),
    posts: t.relation('posts'),
  }),
})

builder.prismaObject('Post', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    title: t.exposeString('title'),
    published: t.exposeBoolean('published'),
    content: t.exposeString('content', { nullable: true }),
    viewCount: t.exposeInt('viewCount'),
    author: t.relation('author'),
  }),
})

export const schema = builder.toSchema({})
