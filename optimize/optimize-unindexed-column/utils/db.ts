import { PrismaClient } from '@prisma/client'
import { withOptimize } from '@prisma/extension-optimize'

export const prisma = new PrismaClient().$extends(
  withOptimize({
    dashboardUrl: 'https://optimize-dev-optimize-ga-dem.datacdn.workers.dev/',
    ingestionUrl:
      'https://optimize-ingestion-dev-optimize-ga-dem.datacdn.workers.dev/',
    token: process.env.OPTIMIZE_API_KEY!,
  }),
)
