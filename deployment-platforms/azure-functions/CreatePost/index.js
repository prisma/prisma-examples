const prisma = require('../lib/prisma')

module.exports = async function (context, req) {
  const { title, content, authorEmail } = req.body
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: false,
        author: {
          connect: {
            email: authorEmail,
          },
        },
      },
    })

    return {
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
