import { UserResolvers } from '../generated/graphqlgen'

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  posts: ({ id }, args, ctx) => {
    return ctx.prisma.user({ id }).posts()
  },
}
