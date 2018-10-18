import { QueryResolvers } from './src/generated/graphqlgen.ts'

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  feed: parent => {
    throw new Error('Resolver not implemented')
  },
  drafts: parent => {
    throw new Error('Resolver not implemented')
  },
  post: (parent, args) => null,
}
