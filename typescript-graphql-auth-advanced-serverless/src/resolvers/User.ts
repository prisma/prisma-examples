import { UserResolvers } from '../generated/graphqlgen'

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,
  posts: (parent, args, ctx) => ctx.db.user({ id: parent.id }).posts(),
  createdAt: parent => parent.createdAt,
}
