import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const posts = await prisma.post.update({
    where: {
      id: parseInt(event.context.params.id)
    },
    data: { published: true }
  })
  return posts
})