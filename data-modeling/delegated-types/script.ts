import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  /**
   * Entire feed
   */
  const content = await prisma.activity.findMany()

  const feed = await Promise.all(content.map((contentItem) => {
    // @ts-ignore
    return prisma[contentItem.type].findUnique({ where: { id: contentItem.id } });
  }))

  console.log('Feed: ');
  console.dir(feed, { depth: Infinity })

  /**
   * Video Feed
   */
  const videoContent = await prisma.activity.findMany({
    where: {
      type: 'video'
    }
  });

  const videoFeed = await Promise.all(videoContent.map((contentItem) => {
    return prisma.video.findUnique({ where: { id: contentItem.id } });
  }))

  console.log('Video feed: ')
  console.dir(videoFeed, { depth: null })

  /**
   * Image Feed
   */
  const imageContent = await prisma.activity.findMany({
    where: {
      type: 'image'
    }
  })

  const imageFeed = await Promise.all(imageContent.map((contentItem) => {
    return prisma.image.findUnique({ where: { id: contentItem.id } });
  }))

  console.log('Image Feed:',)
  console.dir(imageFeed, { depth: null })

  /**
   * Article Feed
   */
  const articleContent = await prisma.activity.findMany({
    where: {
      type: 'article'
    }
  })

  const articleFeed = await Promise.all(articleContent.map((contentItem) => {
    return prisma.article.findUnique({ where: { id: contentItem.id } });
  }))

  console.log('Article Feed: ')
  console.dir(articleFeed, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })