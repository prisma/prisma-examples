import { MutationResolvers } from '../generated/graphqlgen'

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,

  signupUser: (parent, { name, email }, ctx) => {
    return ctx.prisma.createUser({
      name,
      email,
    })
  },
  createDraft: (parent, { title, content, authorEmail }, ctx) => {
    return ctx.prisma.createPost({
      title,
      content,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    })
  },
  deletePost: (parent, { id }, ctx) => {
    return ctx.prisma.deletePost({
      id,
    })
  },
  publish: (parent, { id }, ctx) => {
    return ctx.prisma.updatePost({
      where: {
        id,
      },
      data: {
        published: true,
      },
    })
  },
}
