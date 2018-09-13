import { ITypes } from '../generated/resolvers'
import { QueryRoot } from '../resolvers/Query'
import { MutationRoot } from '../resolvers/Mutation'
import { PostRoot } from '../resolvers/Post'
import { Context } from './Context'

export interface TypeMap extends ITypes {
  Context: Context
  QueryRoot: QueryRoot
  MutationRoot: MutationRoot
  PostRoot: PostRoot
}
