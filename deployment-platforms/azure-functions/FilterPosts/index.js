const prisma = require('../lib/prisma')

module.exports = async function (context, req) {
  const { searchString } = req.query
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

  return  {
    status: 200,
    body: filteredPosts,
  }
}
