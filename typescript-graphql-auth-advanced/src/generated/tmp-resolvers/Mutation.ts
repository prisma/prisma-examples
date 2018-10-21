// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { MutationResolvers } from '../graphqlgen'

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  createDraft: (parent, args) => {
    throw new Error('Resolver not implemented')
  },
  deletePost: (parent, args) => null,
  publish: (parent, args) => null,
  signup: (parent, args) => {
    throw new Error('Resolver not implemented')
  },
  login: (parent, args) => {
    throw new Error('Resolver not implemented')
  },
}
