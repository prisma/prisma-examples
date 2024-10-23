import { builder } from '../builder'
import { prisma } from '../db'
import { PostCreateInput } from './post'

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name', { nullable: true }),
    email: t.exposeString('email'),
    posts: t.relation('posts'),
  }),
})

export const UserUniqueInput = builder.inputType('UserUniqueInput', {
  fields: (t) => ({
    id: t.int(),
    email: t.string(),
  }),
})

const UserCreateInput = builder.inputType('UserCreateInput', {
  fields: (t) => ({
    email: t.string({ required: true }),
    name: t.string(),
    posts: t.field({ type: [PostCreateInput] }),
  }),
})

builder.queryFields((t) => ({
  allUsers: t.prismaField({
    type: ['User'],
    resolve: (query) => prisma.user.findMany({ ...query }),
  }),
}))

builder.mutationFields((t) => ({
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
}))
