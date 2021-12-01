import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient()

describe('Prisma Client Delegate types test', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  test('should return entire feed', async () => {
    const content = await prisma.activity.findMany()

    const feed = await Promise.all(content.map((contentItem) => {
      // @ts-ignore
      return prisma[contentItem.type].findUnique({ where: { id: contentItem.id } });
    }))

    expect(feed.length).toBe(3)
    expect(feed).toBeTruthy()
  })

  test('should return videos from feed', async () => {
    const videoContent = await prisma.activity.findMany({
      where: {
        type: 'video'
      }
    });

    const videoFeed = await Promise.all(videoContent.map((contentItem) => {
      return prisma.video.findUnique({ where: { id: contentItem.id } });
    }))

    expect(videoFeed.length).toBe(1)
    expect(videoFeed).toBeTruthy()
  })

  test('should return articles from feed', async () => {
    const articleContent = await prisma.activity.findMany({
      where: {
        type: 'article'
      }
    })

    const articleFeed = await Promise.all(articleContent.map((contentItem) => {
      return prisma.article.findUnique({ where: { id: contentItem.id } });
    }))

    expect(articleFeed.length).toBe(1)
    expect(articleFeed).toBeTruthy()
  })

  test('should return images from feed', async () => {
    const imageContent = await prisma.activity.findMany({
      where: {
        type: 'image'
      }
    })

    const imageFeed = await Promise.all(imageContent.map((contentItem) => {
      return prisma.image.findUnique({ where: { id: contentItem.id } });
    }))

    expect(imageFeed.length).toBe(1)
    expect(imageFeed).toBeTruthy()

  })

})