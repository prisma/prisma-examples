import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

describe('example test with Prisma Client', () => {
  beforeAll(async () => {
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

  const email = 'ada@prisma.io'
  const firstName = 'Ada'
  const lastName = 'Lovelace'
  let userId: string
  let postId: string

  test('create user', async () => {
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
      },
    })

    expect(user).toBeTruthy()
    expect(typeof user.id).toEqual('string')
    expect(user.firstName).toEqual('Ada')
    expect(user.lastName).toEqual('Lovelace')
    expect(user.email).toEqual('ada@prisma.io')
  })

  test('create a user with posts', async () => {
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        posts: {
          create: [
            {
              title:
                'Bringing value to users with rapid deployment using Prisma',
            },
            {
              title: 'Using Prisma Client with MongoDB',
            },
          ],
        },
      },
      include: {
        posts: true,
      },
    })

    expect(user.id).toBeTruthy()
    expect(user.createdAt instanceof Date).toBeTruthy()
    expect(user.firstName).toEqual(firstName)
    expect(user.email).toEqual(email)

    expect(user.posts.length).toEqual(2)
    expect(user.posts[0].authorId).toEqual(user.id)
    expect(user.posts[0].views).toEqual(0)
    expect(user.posts[0].id).toBeTruthy()
    userId = user.id
    postId = user.posts[0].id
  })

  test('Find user based on user id', async () => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    expect(user).toBeTruthy()
    expect(user?.email).toEqual(email)
  })

  test('Find user and related posts based on user id', async () => {
    const userPosts = await prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .posts()

    expect(userPosts).toBeTruthy()
    expect(userPosts.length).toEqual(2)
  })

  test('Find posts based on author id', async () => {
    const postsFromUser = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    })
    expect(postsFromUser).toBeTruthy()
    expect(postsFromUser.length).toEqual(2)
  })

  test('Filter posts based on title', async () => {
    const postsWithPrisma = await prisma.post.findMany({
      where: {
        title: {
          equals: 'Using Prisma Client with MongoDB',
        },
      },
    })
    expect(postsWithPrisma).toBeTruthy()
    expect(postsWithPrisma.length).toEqual(1)
  })

  test('Update posts - increment count', async () => {
    const postsByUser = await prisma.post.updateMany({
      where: {
        authorId: userId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    })
    expect(postsByUser.count).toBeTruthy()
    expect(postsByUser.count).toEqual(2)

    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      select: {
        views: true,
      },
    })

    expect(posts).toBeTruthy()
    expect(posts.length).toEqual(2)
    expect(posts[0].views).toEqual(1)
    expect(posts[1].views).toEqual(1)
  })

  test('Delete post', async () => {
    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    })
    expect(deletedPost).toBeTruthy()

    const postsByUserCount = await prisma.post.count({
      where: {
        authorId: userId,
      },
    })

    expect(postsByUserCount).toBeTruthy()
    expect(postsByUserCount).toEqual(1)
  })
})
