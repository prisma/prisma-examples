import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const post = await prisma.post.delete(({
    where: {
      id: parseInt(event.context.params.id)
    },
  }))
  return post
})