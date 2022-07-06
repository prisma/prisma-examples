import { prisma } from '$lib/prisma'

export async function get({ params }) {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
    include: { author: true },
  })

  return {
    body: { post }
  }
}

export async function del({ params }) {
  const post = await prisma.post.delete({
    where: { id: Number(params.id) },
  })

  return { body: post }
}
