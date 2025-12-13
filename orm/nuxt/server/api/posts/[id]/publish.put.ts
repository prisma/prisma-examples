export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Post ID is required'
    })
  }

  const post = await prisma.post.update({
    where: {
      id: parseInt(id)
    },
    data: {
      published: true
    },
    include: {
      author: true
    }
  })

  return post
})

