import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id

  if (req.method === 'DELETE') {
    handleDELETE(postId, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// DELETE /api/post/:id
async function handleDELETE(postId, res) {
  const post = await prisma.post.delete({
    where: { id: Number(postId) },
  })
  res.json(post)
}
