import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

export const POST = async ({ request }) => {
  const { title, content, authorEmail } = await request.json()
  const createdPost = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: authorEmail } },
    },
  })

  return json(createdPost)
}
