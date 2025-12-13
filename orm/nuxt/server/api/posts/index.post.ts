export default defineEventHandler(async (event) => {
  const body = await readBody<{
    title: string
    content: string
    authorEmail: string
  }>(event)

  if (!body.title || !body.authorEmail) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title and author email are required'
    })
  }

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content ?? '',
      published: false,
      author: {
        connect: {
          email: body.authorEmail
        }
      }
    },
    include: {
      author: true
    }
  })

  return post
})

