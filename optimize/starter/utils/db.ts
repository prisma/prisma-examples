import { PrismaClient } from '@prisma/client'
import { withOptimize } from '@prisma/extension-optimize'

export const prisma = new PrismaClient().$extends(
  withOptimize({
    dashboardUrl: 'https://optimize-dev-dev-2024-08-13.prisma.workers.dev',
    ingestionUrl:
      'https://optimize-ingestion-dev-dev-2024-08-13.prisma.workers.dev',
    token: process.env.OPTIMIZE_API_KEY,
  }),
)
