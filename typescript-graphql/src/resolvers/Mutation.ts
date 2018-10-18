import { MutationResolvers } from '../generated/graphqlgen'

export interface MutationParent {}

export const Mutation: MutationResolvers.Type = {
  createDraft: (parent, args, ctx) => {
    return ctx.db.createPost({
      title: args.title,
      content: args.content,
      author: { connect: { email: args.authorEmail } },
    })
  },
  deletePost: (parent, { id }, ctx) => ctx.db.deletePost({ id }),
  publish: (parent, { id }, ctx) => {
    return ctx.db.updatePost({
      where: { id },
      data: { isPublished: true },
    })
  },
}
