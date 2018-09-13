import { IMutation } from '../generated/resolvers'
import { TypeMap } from '../types/TypeMap'

export interface MutationRoot {}

export const Mutation: IMutation.Resolver<TypeMap> = {
  createDraft: (root, { content, title }, ctx) =>
    ctx.db.createPost({ title, content }),

  deletePost: (root, { id }, ctx) => ctx.db.deletePost({ id }),

  publish: (root, { id }, ctx) =>
    ctx.db.updatePost({
      where: { id },
      data: { isPublished: true },
    }),
}
