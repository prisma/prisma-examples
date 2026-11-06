import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import app from "../../service.ts";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export function getPrismaClient() {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  let connectionString: string | undefined;
  try {
    connectionString = app.load().db.url;
  } catch {
    connectionString = process.env.DATABASE_URL;
  }

  if (!connectionString) {
    throw new Error("Prisma Compute database connection is not available");
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

  return prisma;
}

const prisma = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = getPrismaClient();
    const value = Reflect.get(client, property, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});

export default prisma;
