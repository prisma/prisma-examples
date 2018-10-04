import { MutationResolvers } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'

export interface MutationParent {}

export const Mutation: $PropertyType<MutationResolvers<TypeMap>, 'Type'> = {
  createDraft: (parent, args, ctx) => {
    return ctx.db.createPost({
      title: args.title,
      content: args.content,
      author: { connect: { email: args.authorEmail } },
    })
  },
  deletePost: (parent, args) => ctx.db.deletePost({ id }),
  publish: (parent, args) => {
    return ctx.db.updatePost({
      where: { id },
      data: { isPublished: true },
    })
  },
}
