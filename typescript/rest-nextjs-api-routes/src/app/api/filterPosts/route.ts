import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/filterPosts?searchString=:searchString
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const searchString = searchParams.get('searchString')
  const resultPosts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: Array.isArray(searchString)
              ? searchString[0]
              : searchString,
          },
        },
        {
          content: {
            contains: Array.isArray(searchString)
              ? searchString[0]
              : searchString,
          },
        },
      ],
    },
  })
  return NextResponse.json(resultPosts)
}
