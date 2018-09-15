import { ITypes } from '../generated/resolvers'

import { QueryRoot } from './Query'

import { Context } from './Context'

export interface Types extends ITypes {
  Context: Context
  QueryRoot: QueryRoot
}
