import prisma from '$lib/prisma'

export async function get() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  })

  return {
    body: { posts }
  }
}
