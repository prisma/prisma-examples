/* @flow */
import type { Mutation_Type } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'

export interface MutationParent {}

export const Mutation: Mutation_Type<TypeMap> = {
  createDraft: (parent, { title, content, authorEmail }, ctx) => {
    return ctx.prisma.createPost({
      title,
      content,
      author: { connect: { email: authorEmail } },
    })
  },
  deletePost: (parent, { id }, ctx) => ctx.prisma.deletePost({ id }),
  publish: (parent, { id }, ctx) => {
    return ctx.prisma.updatePost({
      where: { id },
      data: { isPublished: true },
    })
  },
}
