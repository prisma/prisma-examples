const prisma = require('../lib/prisma')

module.exports = async function (context, req) {
  const { postId } = context.bindingData

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(postId, 10),
      },
    })

    return {
      status: 200,
      body: post,
    }
  } catch (e) {
    context.log(e)
    return {
      status: 500,
      body: e.message,
    }
  }
}
