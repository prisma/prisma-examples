const prisma = require('../lib/prisma')

module.exports = async function (context, req) {
  const { searchString } = req.query
  try {
    const filteredPosts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchString,
            },
          },
          {
            content: {
              contains: searchString,
            },
          },
        ],
      },
    })

    return {
      status: 200,
      body: filteredPosts,
    }
  } catch (e) {
    context.log(e)
    return {
      status: 500,
      body: e.message,
    }
  }
}
