/* @flow */
import type { Query_Type } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'

export interface QueryParent {}

export const Query: Query_Type<TypeMap> = {
  feed: (parent, args, ctx) => ctx.prisma.posts({ where: { isPublished: true } }),
  drafts: (parent, args, ctx) =>
    ctx.prisma.posts({ where: { isPublished: false } }),
  post: (parent, { id }, ctx) => ctx.prisma.post({ id }),
}
