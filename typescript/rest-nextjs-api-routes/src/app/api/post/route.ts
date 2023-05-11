import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export async function POST(request: NextRequest) {
  const body = await request.json()

  const { title, content, authorEmail } = body
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: authorEmail } },
    },
  })
  return new NextResponse(JSON.stringify(result), { status: 201 })
}
