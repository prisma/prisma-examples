/* @flow */
import type { Mutation_Resolvers } from '../generated/graphqlgen'

export const Mutation: Mutation_Resolvers = {
  signupUser: (parent, { email, name }, ctx, info) => {
    return ctx.prisma.createUser({
      name,
      email,
    })
  },
  createDraft: (parent, { title, content, authorEmail }, ctx, info) => {
    return ctx.prisma.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    })
  },
  deletePost: (parent, { id }, ctx, info) => {
    return ctx.prisma.deletePost({
      id,
    })
  },
  publish: (parent, { id }, ctx, info) => {
    return ctx.prisma.updatePost({
      where: { id },
      data: {
        published: true,
      },
    })
  },
}
