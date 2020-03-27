const { PrismaClient, PrismaClientRequestError } = require('@prisma/client')
const prisma = new PrismaClient()

exports.handler = async (event, context, callback) => {
  try {
    const data = JSON.parse(event.body)
    const createdUser = await prisma.user.create({ data })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createdUser)
    }
  } catch (e) {
    if (e instanceof PrismaClientRequestError) {
      if (e.code === 'P2002') {
        return {
          statusCode: 409,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            error: 'A user with this email already exists'
          })
        }
      }
    }

    console.error(e)
    return { statusCode: 500 }
  }
}
