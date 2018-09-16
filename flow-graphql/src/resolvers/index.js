const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { Post } = require('./Post')
const { User } = require('./User')

export const resolvers = {
  Query,
  Mutation,
  User,
  Post,
}
