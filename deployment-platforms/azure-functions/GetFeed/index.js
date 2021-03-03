const prisma = require('../lib/prisma')

module.exports = async function (context, req) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: true,
      },
    })

    return {
      status: 200,
      body: posts,
    }
  } catch (e) {
    context.log(e)
    return {
      status: 500,
      body: e.message,
    }
  }
}
