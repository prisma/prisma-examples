import "dotenv/config"
import { PrismaClient } from './generated/client'
import { faker } from '@faker-js/faker'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate())

const main = async () => {
  await prisma.post.deleteMany()

  for (let index = 0; index < 25; index++) {
    const post = await prisma.post.create({
      data: {
        title: `${faker.animal.dog()} ${faker.airline.airplane().name}`,
        content: faker.lorem.paragraph(),
        url: faker.internet.url(),
        vote: faker.number.int({
          min: 2,
          max: 111,
        }),
      },
    })
    console.log(`Seeded post ${index + 1}:`, post.title)
  }
}

main()
  .then(() => {
    console.log('All seeds completed successfully')
  })
  .catch((e) => {
    console.error('Seeding failed:', e)
  })
  .finally(() => {
    prisma.$disconnect()
  })
