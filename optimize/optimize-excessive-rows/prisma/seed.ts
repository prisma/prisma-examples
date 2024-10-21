import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()
const TOTAL = 30

const main = async () => {
  await prisma.post.deleteMany({})
  await prisma.user.deleteMany({})

  for (let index = 0; index < TOTAL; index++) {
    await prisma.user.create({
      data: {
        email: `${Math.round(Math.random() * 1000)}${faker.internet.email()}`,
        name: faker.internet.displayName(),
        posts: {
          create: {
            title: faker.lorem.sentences(1),
            content: faker.lorem.text(),
            published: faker.datatype.boolean(),
          },
        },
      },
    })

    console.log(`Inserted ${index + 1}/${TOTAL} item.`)
  }

  console.log(`Inserted ${5000}/${TOTAL} item.`)
}

main().then(() => console.log('🌿 Seeding completed.'))
