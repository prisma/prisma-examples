import { Resolvers } from './src/generated/graphqlgen.ts'

import { Query } from './Query'
import { Mutation } from './Mutation'
import { Post } from './Post'
import { User } from './User'

export const resolvers: Resolvers = {
  Query,
  Mutation,
  Post,
  User,
}
