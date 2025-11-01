import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../prisma/generated/client'

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter: pool })

export interface Context {
  prisma: typeof prisma
  req: any // HTTP request carrying the `Authorization` header
}

export function createContext(req: any) {
  return {
    ...req,
    prisma,
  }
}
