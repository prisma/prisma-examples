import { ITypeMap } from '../../generated/resolvers'

import { QueryParent } from '../Query'
import { MutationParent } from '../Mutation'
import { SubscriptionParent } from '../Subscription'
import { PostParent } from '../Post'
import { UserParent } from '../User'

import { Context } from './context'

export interface TypeMap extends ITypeMap {
  Context: Context
  QueryParent: QueryParent
  MutationParent: MutationParent
  SubscriptionParent: SubscriptionParent
  PostParent: PostParent
  UserParent: UserParent
}
