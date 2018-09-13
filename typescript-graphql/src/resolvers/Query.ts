import { IQuery } from '../generated/resolvers'
import { TypeMap } from '../types/TypeMap'

export interface QueryRoot {}

export const Query: IQuery.Resolver<TypeMap> = {
  feed: (root, args, ctx) => ctx.db.posts({ where: { isPublished: true } }),
  drafts: (root, args, ctx) => ctx.db.posts({ where: { isPublished: false } }),
  post: (root, args, ctx) => ctx.db.post({ id: args.id }),
}
