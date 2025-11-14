import 'dotenv/config'
import { PrismaClient } from '../prisma/generated/client'
import { withOptimize } from '@prisma/extension-optimize'
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
export const prisma = new PrismaClient({
  adapter,
}).$extends(
  withOptimize({
    apiKey: process.env.OPTIMIZE_API_KEY!
  }),
)
