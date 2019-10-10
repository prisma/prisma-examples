const { AuthPayload } = require('./AuthPayload')
const { Mutation } = require('./Mutation')
const { Post } = require('./Post')
const { Query } = require('./Query')
const { User } = require('./User')

const resolvers = {
  Query,
  User,
  Post,
  Mutation,
  AuthPayload,
}

module.exports = {
  resolvers
}