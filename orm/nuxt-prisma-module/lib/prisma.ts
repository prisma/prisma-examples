import { Prisma, PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  // Custom extended Prisma ORM instance with client extensions, adding a method to verify the existence of a database entry.
  return new PrismaClient().$extends({
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
