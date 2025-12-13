export default defineEventHandler(async (event) => {
  const body = await readBody<{
    name: string
    email: string
  }>(event)

  if (!body.name || !body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and email are required'
    })
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email }
  })

  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'User with this email already exists'
    })
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email
    }
  })

  return user
})

