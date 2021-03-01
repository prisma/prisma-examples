const fp = require('fastify-plugin')
const { PrismaClient } = require('@prisma/client')

function prismaPlugin(fastify, opts, done) {
  const prisma = new PrismaClient()
  fastify.decorate('prisma', prisma)

  fastify.addHook('onClose', async (instance, done) => {
    // Close connection to the DB when the server is stopped
    await prisma.$disconnect()
    done()
  })
  
  done()
}

module.exports = fp(prismaPlugin)
