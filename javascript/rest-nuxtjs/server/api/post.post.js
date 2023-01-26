import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const { title, content, authorEmail } = await readBody(event)

  const posts = await prisma.post.create({
    data: {
      title,
      content,
      author: {
        connect: {
          email: authorEmail,
        }
      }
    }
  })
  return posts
})