import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

export const PUT = async ({ params: { id } }) => {
  const updatedPost = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      published: true,
    },
  })

  return json(updatedPost)
}
