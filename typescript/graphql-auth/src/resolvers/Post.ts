import { PostResolvers } from '../generated/graphqlgen'

export const Post: PostResolvers.Type = {
  ...PostResolvers.defaultResolvers,
  author: (parent, args, ctx) => ctx.prisma.post({ id: parent.id }).author(),
}
