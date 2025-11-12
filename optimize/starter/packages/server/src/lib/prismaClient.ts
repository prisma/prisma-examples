import 'dotenv/config'
import { PrismaClient } from "../../prisma/generated/client";
import { withOptimize } from "@prisma/extension-optimize";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  }).$extends(
    withOptimize({
      apiKey: process.env.PRISMA_OPTIMIZE_TOKEN!,
    })
  );

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
