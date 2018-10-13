const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { AuthPayload } = require('./AuthPayload')
const { User } = require('./User')
const { Post } = require('./Post')

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  User,
  Post,
}

module.exports = {
  resolvers,
}
