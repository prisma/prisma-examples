import { PrismaClient } from '../generated/prisma'
import { withOptimize } from '@prisma/extension-optimize'

export const prisma = new PrismaClient().$extends(
  withOptimize({
    apiKey: process.env.OPTIMIZE_API_KEY!,
  }),
)
