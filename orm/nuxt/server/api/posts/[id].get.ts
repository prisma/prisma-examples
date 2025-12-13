export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Post ID is required'
    })
  }

  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      author: true
    }
  })

  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found'
    })
  }

  return post
})

