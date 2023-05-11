import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/user
// Required fields in body: name, email
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email } = body
  const { title, content, authorEmail } = body

  const result = await prisma.user.create({
    data: {
      name,
      email,
    },
  })
  return new NextResponse(JSON.stringify(result), { status: 201 })
}
