import { startPrismaDevServer } from '@prisma/dev'

export interface PrismaDevServer {
  url: string
  stop: () => Promise<void>
}

export async function startPrismaDev(): Promise<PrismaDevServer> {
  const server = await startPrismaDevServer({
    databaseIdleTimeoutMillis: 300000,
  })
  const url = server.database.connectionString.replace('localhost', '127.0.0.1')

  return {
    url,
    stop: async () => {
      await server.close()
    },
  }
}
