import { IResolvers } from '../generated/resolvers'
import { TypeMap } from '../types/TypeMap'

import { Query } from './Query'
import { Mutation } from './Mutation'
import { Post } from './Post'

export const resolvers: IResolvers<TypeMap> = {
  Query,
  Mutation,
  Post,
}
