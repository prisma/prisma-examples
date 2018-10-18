import { UserResolvers } from './src/generated/graphqlgen.ts'

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  posts: parent => {
    throw new Error('Resolver not implemented')
  },
}
