const { PrismaClientKnownRequestError } = require('@prisma/client')
const prisma = require('../lib/prisma')

module.exports = async function (context, req) {
  const { postId } = context.bindingData

  try {
    const post = await prisma.post.delete({
      where: {
        id: parseInt(postId, 10),
      },
    })
    return {
      body: post,
    }
  } catch (e) {
    context.log(e)

    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
      return {
        status: 400,
        body: `postId ${postId} cannot be deleted because it does not exist.`,
      }
    }

    return {
      status: 500,
      body: e.message,
    }
  }
}
