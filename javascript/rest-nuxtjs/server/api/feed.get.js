import prisma from '~/lib/prisma'

export default defineEventHandler(async (_event) => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  })
  return feed
})