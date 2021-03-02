const prisma = require('../lib/prisma')

module.exports = async function (context, req) {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: true,
    },
  })

  return  {
    status: 200,
    body: posts,
  }
}
