/* @flow */
import type { Query_Type } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'

export interface QueryParent {}

export const Query: Query_Type<TypeMap> = {
  feed: parent => {
    throw new Error('Resolver not implemented')
  },
  drafts: parent => {
    throw new Error('Resolver not implemented')
  },
  post: (parent, args) => null,
}
