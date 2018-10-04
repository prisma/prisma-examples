import { SubscriptionResolvers } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'

export interface SubscriptionParent {}

export const Subscription: SubscriptionResolvers.Type<TypeMap> = {
  posts: {
    subscribe: async (parent, args, ctx, info) => {
      return ctx.db.$subscribe
        .post({
          mutation_in: ['CREATED', 'UPDATED'],
        })
        .node()
    },
    resolve: payload => {
      return payload
    },
  },
}
