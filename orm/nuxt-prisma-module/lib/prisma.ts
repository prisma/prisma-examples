import { Prisma, PrismaClient } from "../prisma/generated/prisma/client"
import { PrismaPg } from '@prisma/adapter-pg'

const prismaClientSingleton = () => {

  // Custom extended Prisma ORM instance with client extensions, adding a method to verify the existence of a database entry.
  const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
  return new PrismaClient({ adapter: pool }).$extends({
    model: {
      $allModels: {
        async exists<T>(
          this: T,
          where: Prisma.Args<T, 'findFirst'>['where'],
        ): Promise<boolean> {
          const context = Prisma.getExtensionContext(this)
          const result = await (context as any).findFirst({ where })
          return result !== null
        },
      },
    },
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
