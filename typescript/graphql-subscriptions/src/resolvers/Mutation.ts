import { MutationResolvers } from '../generated/graphqlgen'

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,

  createDraft: (parent, { title, content }, context) => {
    return context.prisma.createPost({
      title,
      content,
    })
  },
  deletePost: (parent, { id }, context) => {
    return context.prisma.deletePost({ id })
  },
  publish: (parent, { id }, context) => {
    return context.prisma.updatePost({
      where: { id },
      data: { published: true },
    })
  },
}
