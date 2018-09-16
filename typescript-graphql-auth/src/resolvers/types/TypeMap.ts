import { ITypeMap } from '../../generated/resolvers'

import { QueryParent } from '../Query'
import { MutationParent } from '../Mutation'
import { AuthPayloadParent } from '../AuthPayload'
import { UserParent } from '../User'

import { Context } from './Context'

export interface TypeMap extends ITypeMap {
  Context: Context
  QueryParent: QueryParent
  MutationParent: MutationParent
  AuthPayloadParent: AuthPayloadParent
  UserParent: UserParent
}
