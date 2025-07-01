import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from './generated/prisma-edge/client'
import { env } from './env/server'

export type GetDbParams = {
  connectionString: string
}

export function getDb({ connectionString }: GetDbParams) {
  const prisma = new PrismaClient({
    datasourceUrl: connectionString,
  }).$extends(withAccelerate())

  return prisma
}

const prisma = getDb({ connectionString: env.DATABASE_URL })
export default prisma
