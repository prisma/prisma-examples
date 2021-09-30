import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()
  // Seed the database with users and posts
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
      posts: {
        create: [
          {
            title: 'Watch the talks from Prisma Day 2019',
            content: 'https://www.prisma.io/blog/z11sg6ipb3i1/',
            published: true,
          },
          {
            title: 'Watch the talks from Prisma Day 2021',
            content: 'https://www.prisma.io/day',
            published: true,
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  })
  const user2 = await prisma.user.create({
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Subscribe to GraphQL Weekly for community news',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma/',
            published: false,
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  })
  console.log(
    `Created users: ${user1.name} (${user1.posts.length} post) and ${user2.name} (${user2.posts.length} posts) `,
  )
  console.log(user1)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
