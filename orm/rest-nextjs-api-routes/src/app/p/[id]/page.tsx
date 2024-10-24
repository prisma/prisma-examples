import React from 'react'
import { notFound, } from 'next/navigation'
import prisma from '../../../lib/prisma'
import PostDetails from '../../../components/PostDetails'

export default async function Post({ params }: { params: { id: string } }) {
  const id = Number(
    Array.isArray(params?.id)
      ? params?.id[0]
      : params?.id,
  )
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  })

  if (!post) notFound()

  return (
    <PostDetails {...post} />
  )
}
