import { prisma } from '$lib/prisma'

export async function put({ params }) {
  const post = await prisma.post.update({
    where: { id: Number(params.id) },
    data: { published: true },
  })

  return { body: post }
}
