import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

export const GET = async ({ params: { id } }) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { author: true },
  })

  return json(post)
}

export const DELETE = async ({ params: { id } }) => {
  const deletedPost = await prisma.post.delete({
    where: { id: Number(id) },
  })

  return json(deletedPost)
}
