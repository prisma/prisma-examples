import { PrismaClient } from "@prisma/client";
import { withPulse } from "@prisma/extension-pulse";

const prismaClientSingleton = () => {
  // return new PrismaClient() //.$extends(withPulse({ apiKey: process.env.PULSE_API_KEY }));
  return new PrismaClient().$extends(withPulse({ apiKey: process.env.PULSE_API_KEY || '' }));
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
