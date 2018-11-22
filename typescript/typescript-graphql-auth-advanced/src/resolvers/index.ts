import { Resolvers } from '../generated/graphqlgen'

import { Query } from './Query'
import { Mutation } from './Mutation'
import { AuthPayload } from './AuthPayload'
import { Post } from './Post'
import { User } from './User'

export const resolvers: Resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Post,
  User,
}
