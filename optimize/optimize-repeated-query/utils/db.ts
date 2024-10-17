import { PrismaClient } from '@prisma/client'
import { withOptimize } from '@prisma/extension-optimize'

export const prisma = new PrismaClient().$extends(
  withOptimize({
    dashboardUrl: "https://optimize-dev-pr606.prisma.workers.dev",
    ingestionUrl: "https://optimize-ingestion-dev-pr606.prisma.workers.dev",
    apiKey: process.env.OPTIMIZE_API_KEY!,
  }),
)
