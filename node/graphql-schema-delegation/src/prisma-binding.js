const { Prisma } = require('prisma-binding')

module.exports = {
  prisma: new Prisma({
    typeDefs: './generated/prisma.graphql',
    endpoint: '__PRISMA_ENDPOINT__',
  }),
}
