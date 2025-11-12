import { PrismaClient } from '../prisma/generated/client';
import { withAccelerate } from '@prisma/extension-accelerate'

const prismaClientSingleton = () => {
  return new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate())
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
