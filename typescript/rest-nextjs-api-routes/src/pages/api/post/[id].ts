import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const postId = req.query.id

  switch (req.method) {
    case 'DELETE':
      return handleDELETE(postId, res)

    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`,
      )
  }
}

// DELETE /api/post/:id
async function handleDELETE(postId: unknown, res: NextApiResponse<any>) {
  const post = await prisma.post.delete({
    where: { id: Number(postId) },
  })
  return res.json(post)
}
