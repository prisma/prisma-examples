import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: import.meta.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export default prisma;
