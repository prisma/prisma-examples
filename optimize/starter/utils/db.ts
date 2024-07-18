import { PrismaClient } from "@prisma/client";
import { withOptimize } from "@prisma/extension-optimize";

export const prisma = new PrismaClient().$extends(
  withOptimize({
    dashboardUrl: "https://optimize-dev-dev.prisma.workers.dev/",
    ingestionUrl: "https://optimize-ingestion-dev-dev.prisma.workers.dev/",
  })
);
