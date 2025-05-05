import type { APIRoute } from 'astro'
import prisma from '../../lib/prisma'

export const GET: APIRoute = async () => {
  const users = await prisma.user.findMany({
    include: { posts: true },
  })

  console.log(users)
  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' },
  })
}
