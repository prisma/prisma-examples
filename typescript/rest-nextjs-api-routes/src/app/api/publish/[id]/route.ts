import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// PUT /api/publish/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const post = await prisma.post.update({
    where: { id: Number(params.id) },
    data: { published: true },
  })
  return NextResponse.json(post)
}
