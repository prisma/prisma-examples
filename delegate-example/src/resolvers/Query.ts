import { IQuery } from '../generated/resolvers'
import { Types } from './types'

export interface QueryRoot {}

export const Query: IQuery.Resolver<Types> = {
  masters: (root, args, ctx, info) =>
    (ctx.db.$delegate.query.masters as any)(args, info),
}
