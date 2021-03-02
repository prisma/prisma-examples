const prisma = require('../lib/prisma')

module.exports = async function (context, req) {
  const { id } = req.query

  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  })

  return  {
    status: 200,
    body: post,
  }
}
