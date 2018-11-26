import { Resolvers } from '../generated/graphqlgen'

import { Query } from './Query'
import { User } from './User'
import { Post } from './Post'
import { Mutation } from './Mutation'
import { AuthPayload } from './AuthPayload'

export const resolvers: Resolvers = {
  Query,
  User,
  Post,
  Mutation,
  AuthPayload,
}
