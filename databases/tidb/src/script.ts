import { PrismaClient } from '@prisma/client'
import prettyjson from 'prettyjson'

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        tag: 'Node.js',
      },
    }),
    prisma.tag.create({
      data: {
        tag: 'TypeScript',
      },
    }),
    prisma.tag.create({
      data: {
        tag: 'Prisma',
      },
    }),
    prisma.tag.create({
      data: {
        tag: 'Databases',
      },
    }),
    prisma.tag.create({
      data: {
        tag: 'TiDB',
      },
    }),
    prisma.tag.create({
      data: {
        tag: 'Serverless',
      },
    }),
  ])

  console.log('Created tags: \n', prettyjson.render(tags))

  // Seed the database with users and posts
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
      posts: {
        create: {
          title: 'Productive development with Prisma and TiDB',
          published: true,
          tags: {
            connect: [
              {
                tag: 'Prisma',
              },
              {
                tag: 'TiDB',
              },
            ],
          },
        },
      },
    },
    include: {
      posts: true,
    },
  })

  console.log('Created first user: \n', prettyjson.render(user1))

  const user2 = await prisma.user.create({
    data: {
      email: 'shakuntala@prisma.io',
      name: 'Shakuntala',
      comments: {
        create: {
          comment:
            'Thanks for sharing. TiDB has helped us rapidly scale our architecture with very little effort.',
          post: {
            connect: {
              id: user1.posts[0].id,
            },
          },
        },
      },
      posts: {
        create: [
          {
            title: 'Introducing to Prisma with TiDB',
            published: true,
            content:
              'Check out the Prisma blog at https://www.prisma.io/blog for more information',
            tags: {
              connect: [
                {
                  tag: 'Node.js',
                },
                {
                  tag: 'TiDB',
                },
                {
                  tag: 'Databases',
                },
              ],
            },
          },
          {
            title: 'Zero cost type safety with Prisma',
            published: true,
            tags: {
              connect: [
                {
                  tag: 'Node.js',
                },
                {
                  tag: 'Databases',
                },
              ],
            },
          },
          {
            title: 'Horizontal scaling made easy',
            published: false,
          },
        ],
      },
    },
    include: {
      posts: {
        include: {
          tags: true,
        },
      },
      comments: {
        include: {
          post: true,
        },
      },
    },
  })

  console.log('Created second user: \n', prettyjson.render(user2))

  const taggedPosts = await prisma.tag.findUnique({
    where: {
      tag: 'Node.js',
    },
    include: {
      posts: true,
    },
  })

  console.log(
    'Retrieved all posts with the Node.js tag: ',
    prettyjson.render(taggedPosts),
  )

  // Retrieve all published posts with a tag
  const allPosts = await prisma.post.findMany({
    where: {
      AND: [
        { published: true },
        {
          tags: {
            some: {
              tag: 'TiDB',
            },
          },
        },
      ],
    },
  })
  console.log(
    `Retrieved all published posts with the TiDB tag: `,
    prettyjson.render(allPosts),
  )

  // Create a new post (written by an already existing user with email alice@prisma.io)
  const newPost = await prisma.post.create({
    data: {
      title: 'Join the Prisma Slack community',
      content: 'http://slack.prisma.io',
      published: false,
      author: {
        connect: {
          email: 'alice@prisma.io', // Should have been created during initial seeding
        },
      },
      tags: {
        connectOrCreate: {
          create: {
            tag: 'Community',
          },
          where: {
            tag: 'Community',
          },
        },
        connect: {
          tag: 'Prisma',
        },
      },
      comments: {
        create: {
          comment: 'Looking forward to joining to Prisma community.',
          writtenBy: {
            connect: {
              email: 'shakuntala@prisma.io',
            },
          },
        },
      },
    },
    include: {
      comments: {
        include: {
          writtenBy: true,
        },
      },
      tags: true,
    },
  })
  console.log(`Created a new post: \n`, prettyjson.render(newPost))

  // Publish the new post
  const updatedPost = await prisma.post.update({
    where: {
      id: newPost.id,
    },
    data: {
      published: true,
    },
  })
  console.log(`Published the newly created post: `, updatedPost)

  // Retrieve all posts by user with email alice@prisma.io
  const postsByUser = await prisma.user
    .findUnique({
      where: {
        email: 'alice@prisma.io',
      },
    })
    .posts()
  console.log(`Retrieved all posts from a specific user: `, postsByUser)
}

async function clearDB() {
  await prisma.tag.deleteMany({})
  await prisma.comment.deleteMany({})
  await prisma.post.deleteMany({})
  await prisma.user.deleteMany({})
}

clearDB()
  .then(main)
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
