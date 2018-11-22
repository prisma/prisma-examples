/* @flow */
import type { Mutation_Type } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'

export interface MutationParent {}

export const Mutation: Mutation_Type<TypeMap> = {
  createDraft: (parent, { title, content, authorEmail }, ctx) => {
    return ctx.db.createPost({
      title,
      content,
      author: { connect: { email: authorEmail } },
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
