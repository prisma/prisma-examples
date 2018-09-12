const { Query } = require('./Query')
const { SpecialMaster } = require('./SpecialMaster')
const { Cat } = require('./Cat')

const resolvers = {
  Query,
  SpecialMaster,
  Cat
};

module.exports = {
  resolvers,
}
