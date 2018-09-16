import { MutationResolvers } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'

export interface MutationParent {}

export const Mutation: MutationResolvers.Type<TypeMap> = {
  createDraft: (_parent, args, ctx, info) => {
    return ctx.binding.mutation.createPost(
      {
        data: {
          title: args.title,
          content: args.content,
          author: { connect: { email: args.authorEmail } },
        },
      },
      info,
    )
  },

  deletePost: (_parent, { id }, ctx, info) => {
    return ctx.binding.mutation.deletePost(
      {
        where: {
          id,
        },
      },
      info,
    )
  },

  publish: (_parent, { id }, ctx, info) => {
    return ctx.binding.mutation.updatePost(
      {
        where: {
          id,
        },
        data: { isPublished: true },
      },
      info,
    )
  },
}
