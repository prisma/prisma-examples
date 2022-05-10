import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

describe('example test with Prisma Client', () => {
  beforeAll(async () => {
    await prisma.tag.deleteMany({})
    await prisma.comment.deleteMany({})
    await prisma.post.deleteMany({})
    await prisma.user.deleteMany({})
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })
  test('test query', async () => {
    const data = await prisma.user.findMany({ take: 1, select: { id: true } })
    expect(data).toBeTruthy()
  })

  test('create tags', async () => {
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
          tag: 'Cockroach Labs',
        },
      }),
      prisma.tag.create({
        data: {
          tag: 'Serverless',
        },
      }),
    ])

    expect(tags.length).toEqual(6)
    expect(typeof tags[0].id).toEqual('string')
    expect(tags[0].tag).toBeTruthy()
  })

  test('create two user with posts comments and tags', async () => {
    let email = 'alice@prisma.io'
    let name = 'Alice'

    const user1 = await prisma.user.create({
      data: {
        email,
        name,
        posts: {
          create: {
            title: 'Bringing value to users with rapid deployment',
            published: true,
            tags: {
              connect: {
                tag: 'Prisma',
              },
            },
          },
        },
      },
      include: {
        posts: true,
      },
    })

    expect(user1.id).toBeTruthy()
    expect(user1.name).toEqual(name)
    expect(user1.email).toEqual(email)
    expect(
      user1.createdAt.getMonth() === new Date().getMonth() &&
        user1.createdAt.getFullYear() === new Date().getFullYear(),
    ).toBeTruthy()
    expect(user1.posts.length).toEqual(1)
    expect(user1.posts[0].published).toEqual(true)

    email = 'shakuntala@prisma.io'
    name = 'Shakuntala'

    const user2 = await prisma.user.create({
      data: {
        name,
        email,
        comments: {
          create: {
            comment:
              'Thanks for sharing. Reducing the size of our releases and deployment more frequently has allowed us to bring more value to our customers.',
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
              title: 'GraphQL Authentication simplified',
              published: false,
            },
            {
              title: 'Introducing to Prisma with CockroachDB',
              published: true,
              content:
                'Check out the Prisma blog at https://www.prisma.io/blog for more information',
              tags: {
                // Creates the rows in the m-n relation table
                connect: [
                  {
                    tag: 'Node.js',
                  },
                  {
                    tag: 'Cockroach Labs',
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
                // Creates the rows in the m-n relation table
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

    expect(user2.id).toBeTruthy()
    expect(user2.name).toEqual(name)
    expect(user2.email).toEqual(email)
    expect(user2.posts.length).toEqual(3)
    expect(user2.posts[0].authorId).toEqual(user2.id)
    expect(user2.posts[0].tags[0].id).toBeTruthy()
    expect(
      user2.comments[0].comment.toLowerCase().includes('thanks'),
    ).toBeTruthy()
    expect(user2.comments[0].postId).toEqual(user1.posts[0].id)

    expect(
      user2.createdAt.getMonth() === new Date().getMonth() &&
        user2.createdAt.getFullYear() === new Date().getFullYear(),
    ).toBeTruthy()

    const updatedName = 'Shakuntala Devi'
    const updatedUser2 = await prisma.user.update({
      data: {
        name: updatedName,
      },
      where: {
        id: user2.id,
      },
    })

    expect(updatedUser2.name).toEqual(updatedName)
  })

  test('Get all published posts with a given tag', async () => {
    // Retrieve all published posts
    const taggedPosts = await prisma.tag.findUnique({
      where: {
        tag: 'Node.js',
      },
      include: {
        posts: true,
      },
    })
    expect(taggedPosts).toBeTruthy()
    expect(taggedPosts?.tag).toEqual('Node.js')
    expect(taggedPosts?.posts.length).toEqual(2)
  })

  test('Create unpublished post with tags and comments for an existing user and then publish', async () => {
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
        comments: true,
        tags: true,
      },
    })
    expect(newPost).toBeTruthy()
    expect(newPost.tags.length).toEqual(2)
    expect(newPost.tags[0].tag).toBeTruthy()
    expect(newPost.comments.length).toEqual(1)

    await prisma.post.update({
      where: {
        id: newPost.id,
      },
      data: {
        published: true,
      },
    })
  })

  test('Find comments by a user', async () => {
    // Retrieve all published posts
    const userComments = await prisma.user
      .findUnique({
        where: {
          email: 'shakuntala@prisma.io',
        },
      })
      .comments()
    expect(userComments).toBeTruthy()
    expect(userComments.length).toEqual(2)
  })

  test('Fetch posts by a user', async () => {
    // Retrieve all published posts
    const userPosts = await prisma.user
      .findUnique({
        where: {
          email: 'shakuntala@prisma.io',
        },
      })
      .posts()
    expect(userPosts).toBeTruthy()
    expect(userPosts.length).toEqual(3)
  })
})
