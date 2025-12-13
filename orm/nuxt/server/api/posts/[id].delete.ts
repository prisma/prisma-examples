export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Post ID is required'
    })
  }

  const post = await prisma.post.delete({
    where: {
      id: parseInt(id)
    }
  })

  return post
})

