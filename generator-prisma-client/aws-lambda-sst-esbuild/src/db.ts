import { PrismaPg } from '@prisma/adapter-pg'
import { Resource } from "sst";
import { PrismaClient } from './generated/prisma/client'

export type { PrismaClient } from './generated/prisma/client'

export type GetDbParams = {
  connectionString: string
}

export function getDb({ connectionString }: GetDbParams) {
  const pool = new PrismaPg({ connectionString })
  const prisma = new PrismaClient({ adapter: pool })

  return prisma
}

const prisma = getDb({ connectionString: Resource.DIRECT_URL.value })
export default prisma
