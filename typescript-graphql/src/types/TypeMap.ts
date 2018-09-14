import { ITypeMap } from '../generated/resolvers'
import { QueryParent } from '../resolvers/Query'
import { MutationParent } from '../resolvers/Mutation'
import { PostParent } from '../resolvers/Post'
import { UserParent } from '../resolvers/User'
import { Context } from './Context'

export interface TypeMap extends ITypeMap {
  Context: Context
  QueryParent: QueryParent
  MutationParent: MutationParent
  PostParent: PostParent
  UserParent: UserParent
}
