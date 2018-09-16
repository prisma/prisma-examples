import { QueryResolvers } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'

export interface QueryParent {}

export const Query: QueryResolvers.Type<TypeMap> = {
  feed: (_parent, _args, ctx, info) => {
    return ctx.binding.query.posts({ where: { isPublished: true } }, info)
  },
  drafts: (_parent, _args, ctx, info) => {
    return ctx.binding.query.posts({ where: { isPublished: false } }, info)
  },
  post: (_parent, args, ctx, info) => {
    return ctx.binding.query.post({ where: { id: args.id } }, info)
  },
}
