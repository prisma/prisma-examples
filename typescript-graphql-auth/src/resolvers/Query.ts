import { QueryResolvers } from '../generated/resolvers'
import { getUserId } from '../utils'
import { TypeMap } from './types/TypeMap'

export interface QueryParent {}

export const Query: QueryResolvers.Type<TypeMap> = {
  me: (_parent, _args, ctx) => {
    return ctx.db.user({ id: getUserId(ctx) })
  },
}
