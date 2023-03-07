import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const drafts = await prisma.post.findMany({
    where: { published: false },
    include: { author: true },
  })
  return drafts
})