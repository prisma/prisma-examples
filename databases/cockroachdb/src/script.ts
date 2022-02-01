import { PrismaClient } from '@prisma/client'
import prettyjson from 'prettyjson'

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main(): Promise<void> {
  // Seed the database with users and posts
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
      posts: {
        create: {
          title: 'Productive development with Prisma and CockroachDB',
          published: true,
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
          content:
            'Thanks for sharing. CockroachDB has helped us rapidly scale our architecture with very little effort.',
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
            title: 'Introducing to Prisma with CockroachDB',
            published: true,
            content:
              'Check out the Prisma blog at https://www.prisma.io/blog for more information',
          },
          {
            title:
              'Zero cost type safety for your database queries with Prisma',
            published: true,
          },
          {
            title: 'Horizontal scaling made easy',
            published: false,
          },
        ],
      },
    },
    include: {
      comments: {
        include: {
          post: true,
        },
      },
    },
  })

  console.log('Created second user: \n', prettyjson.render(user2))

  const allPosts = await prisma.post.findMany({
    where: {
      AND: [
        { published: true },
        {
          createdAt: new Date(2020, 0, 1),
        },
      ],
    },
  })
  console.log(
    `Retrieved all published posts created after 2020.1.1:`,
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
      comments: {
        create: {
          content: 'Looking forward to joining to Prisma community.',
          author: {
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
          author: true,
        },
      },
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
