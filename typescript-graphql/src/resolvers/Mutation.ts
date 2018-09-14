import { MutationResolvers } from '../generated/resolvers'
import { TypeMap } from '../types/TypeMap'

export interface MutationParent {}

export const Mutation: MutationResolvers.Type<TypeMap> = {
  createDraft: (parent, { content, title }, ctx) =>
    ctx.db.createPost({ title, content }),

  deletePost: (parent, { id }, ctx) => ctx.db.deletePost({ id }),

  publish: (parent, { id }, ctx) =>
    ctx.db.updatePost({
      where: { id },
      data: { isPublished: true },
    }),
}
