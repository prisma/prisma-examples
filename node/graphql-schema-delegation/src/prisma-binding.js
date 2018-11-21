const { Prisma } = require('prisma-binding')
const { typeDefs } = require('./generated/prisma-client/prisma-schema')

module.exports = {
  prismaBinding: new Prisma({
    typeDefs,
    endpoint: 'http://localhost:4466',
  }),
}
