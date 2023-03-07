import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

export async function GET() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  })

  return json(feed)
}
