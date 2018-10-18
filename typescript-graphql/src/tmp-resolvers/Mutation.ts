import { MutationResolvers } from './src/generated/graphqlgen.ts'

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  createDraft: (parent, args) => {
    throw new Error('Resolver not implemented')
  },
  deletePost: (parent, args) => null,
  publish: (parent, args) => null,
}
