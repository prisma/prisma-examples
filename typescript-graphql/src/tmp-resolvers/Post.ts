import { PostResolvers } from './src/generated/graphqlgen.ts'

export const Post: PostResolvers.Type = {
  ...PostResolvers.defaultResolvers,

  author: parent => {
    throw new Error('Resolver not implemented')
  },
}
