import { PrismaClient } from "@prisma/client";
import { withOptimize } from "@prisma/extension-optimize";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient().$extends(
    withOptimize({
      dashboardUrl: "https://optimize-dev-pr402.datacdn.workers.dev",
      ingestionUrl: "https://optimize-ingestion-dev-pr402.datacdn.workers.dev",
      token: process.env.PRISMA_OPTIMIZE_TOKEN!,
    })
  );

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
