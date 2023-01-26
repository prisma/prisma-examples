import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const { name, email, posts } = await readBody(event)

  const postData = posts
    ? posts.map((post) => {
      return { title: post.title, content: post.content || undefined }
    })
    : []

  const user = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: postData
      }
    },
  })
  return user
})