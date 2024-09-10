import { PrismaClient } from '@prisma/client'
import { withOptimize } from '@prisma/extension-optimize'

export const prisma = new PrismaClient().$extends(
  withOptimize({
    token: process.env.OPTIMIZE_API_KEY!,
  }),
)
