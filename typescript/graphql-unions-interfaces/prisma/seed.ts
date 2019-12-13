import { Photon } from '@prisma/photon'
const photon = new Photon()

async function main() {
  const author1 = await photon.users.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
      articles: {
        create: {
          title: 'Watch the talks from Prisma Day 2019',
          content: 'https://www.prisma.io/blog/z11sg6ipb3i1/',
          published: true,
        },
      },
    },
  })
  const author2 = await photon.users.create({
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
      articles: {
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
  })
  const photographer1 = await photon.users.create({
    data: {
      email: 'eve@prisma.io',
      name: 'Eve',
      photos: {
        create:
          { description: 'Self-portrait #18', },
      },
    },
  })
  const photographer2 = await photon.users.create({
    data: {
      email: 'mallory@prisma.io',
      name: 'Mallory',
      photos: {
        create:
          { description: 'Mist over the park', },
      },
    },
  })

  console.log({ author1, author2, photographer1, photographer2 })
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect()
  })
