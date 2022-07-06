import prisma from '$lib/prisma'

export async function post({ request }) {
  const { title, content, authorEmail } = await request.json()
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  })

  return { body: result }
}
