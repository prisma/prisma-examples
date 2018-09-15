const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { AuthPayload } = require('./AuthPayload')
const { User } = require('./User')

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  User,
}

module.exports = {
  resolvers,
}
