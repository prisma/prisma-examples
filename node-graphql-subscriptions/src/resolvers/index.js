const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { Subscription } = require('./Subscription')
const { Post } = require('./Post')
const { User } = require('./User')

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
}

module.exports = {
  resolvers,
}
