import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const { userId: clerkId } = await auth()
  if (!clerkId) return new Response('Unauthorized', { status: 401 })

  const { title, content } = await req.json()

  const user = await prisma.user.findUnique({
    where: { clerkId },
  })

  if (!user) return new Response('User not found', { status: 404 })

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: user.id,
    },
  })

  return new Response(JSON.stringify(post), { status: 201 })
}
