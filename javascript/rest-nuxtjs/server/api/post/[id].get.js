import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const post = await prisma.post.findUnique(({
    where: {
      id: parseInt(event.context.params.id)
    },
    include: { author: true }
  }))
  return post
})