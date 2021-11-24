import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid'

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`)

  const articleId = uuid()
  const articles = await prisma.$transaction([
    prisma.article.create({ data: { id: articleId, title: 'Prisma with Delegated Types?', body: 'Learn all about Prisma, Delegated types and how they work' } }),
    prisma.activity.create({ data: { id: articleId, type: 'article' } })
  ])

  console.dir(articles[0], { depth: null })


  const videoId = uuid()
  const videos = await prisma.$transaction([
    prisma.video.create({
      data: {
        id: videoId,
        duration: 59,
      }
    }),
    prisma.activity.create({ data: { id: videoId, type: 'video' } })
  ])

  console.dir(videos[0], { depth: null })


  const imageId = uuid()
  const images = await prisma.$transaction([
    prisma.image.create({
      data: {
        id: imageId,
        width: 100,
        height: 100,
      }
    }),
    prisma.activity.create({ data: { id: imageId, type: 'image' } })
  ])

  console.dir(images[0], { depth: null })

  console.log(`Finished seeding`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })