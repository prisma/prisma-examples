import { prisma } from '$lib/prisma'

export async function get() {
  const posts = await prisma.post.findMany({
    where: { published: false },
    include: { author: true },
  })

  return {
    body: { posts }
  }
}
