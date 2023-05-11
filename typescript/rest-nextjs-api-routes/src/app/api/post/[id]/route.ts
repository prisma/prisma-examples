import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// DELETE /api/post/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const post = await prisma.post.delete({
    where: { id: Number(params.id) },
  })
  revalidatePath('/')
  revalidatePath('/drafts')
  return NextResponse.json(post)
}

// GET /api/post/:id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
    include: { author: true },
  })
  return NextResponse.json(post)
}
