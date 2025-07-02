import { PrismaClient } from '@prisma/client'
import Hapi from '@hapi/hapi'
import { withAccelerate } from '@prisma/extension-accelerate'

const prismaClientSingleton = () =>
  new PrismaClient().$extends(withAccelerate())

declare module '@hapi/hapi' {
  interface ServerApplicationState {
    prisma: ReturnType<typeof prismaClientSingleton>
  }
}

// plugin to instantiate Prisma Client
const prismaPlugin: Hapi.Plugin<null> = {
  name: 'prisma',
  register: async function (server: Hapi.Server) {
    const prisma = prismaClientSingleton()

    server.app.prisma = prisma

    // Close DB connection after the server's connection listeners are stopped
    // Related issue: https://github.com/hapijs/hapi/issues/2839
    server.ext({
      type: 'onPostStop',
      method: async (server: Hapi.Server) => {
        server.app.prisma.$disconnect()
      },
    })
  },
}

export default prismaPlugin
