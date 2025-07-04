import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '~/lib/generated/prisma/client'

export type GetDbParams = {
  connectionString: string
}

export function getDb({ connectionString }: GetDbParams) {
  const pool = new PrismaPg({ connectionString })
  const prisma = new PrismaClient({ adapter: pool })

  return prisma
}

const prisma = getDb({ connectionString: process.env.DIRECT_URL! })
export default prisma
