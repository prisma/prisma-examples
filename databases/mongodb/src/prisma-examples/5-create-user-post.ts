import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany()
  const user = await prisma.user.create({
    data: {
      email: 'david@prisma.io',
      firstName: 'David',
      lastName: 'Deutsch',
      posts: {
        create: [
          { title: 'Hello world' },
          { title: 'Introduction to Prisma with Mongo' },
          { title: 'MongoDB and schemas' },
        ],
      },
    },
    include: {
      posts: true,
    },
  })

  console.dir(user, { depth: Infinity })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
