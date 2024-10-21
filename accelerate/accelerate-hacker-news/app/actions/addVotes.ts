'use server'

import prisma from '@/lib/db'

export async function addVotes(id: number) {
  // console.log({
  //   updating: id,
  // })

  await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      vote: {
        increment: 1,
      },
    },
  })

  await prisma.$accelerate.invalidate({
    tags: ['posts'],
  })

  return id
}
