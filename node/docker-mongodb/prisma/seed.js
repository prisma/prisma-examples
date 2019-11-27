const { prisma } = require('../src/generated/prisma-client')

async function main() {
  await prisma.createUser({
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: [
        {
          title: 'Join us for Prisma Day 2019 in Berlin',
          content: 'https://www.prisma.io/day/',
          published: true,
        },
      ],
    },
  })

  await prisma.createUser({
    name: 'Bob',
    email: 'bob@prisma.io',
    posts: {
      create: [
        {
          title: 'Subscribe to GraphQL Weekly for community news',
          content: 'https://graphqlweekly.com/',
          published: true,
          comments: {
            create: [
              {
                text: 'Can recommend 💯',
                writtenBy: {
                  connect: { email: 'alice@prisma.io' },
                },
              },
            ],
          },
        },
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://twitter.com/prisma',
        },
      ],
    },
  })
}

main()
