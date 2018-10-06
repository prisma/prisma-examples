/* @flow */
import type { Mutation_Type } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'

export interface MutationParent {}

export const Mutation: Mutation_Type<TypeMap> = {
  createDraft: (parent, args) => {
    throw new Error('Resolver not implemented')
  },
  deletePost: (parent, args) => null,
  publish: (parent, args) => null,
}
