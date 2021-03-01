import fastify, { FastifyServerOptions } from 'fastify'

export default function createServer(opts: FastifyServerOptions = {}) {
  const server = fastify(opts)
  server.register(require('fastify-formbody'))
  server.register(require('./plugins/prisma'))
  server.register(require('./plugins/api'))

  return server
}
