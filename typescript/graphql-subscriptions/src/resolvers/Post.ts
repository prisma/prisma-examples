import { PostResolvers } from '../generated/graphqlgen'

export const Post: PostResolvers.Type = {
  ...PostResolvers.defaultResolvers,
}
