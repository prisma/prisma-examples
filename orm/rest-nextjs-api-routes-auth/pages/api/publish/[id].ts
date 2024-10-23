import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma'

// PUT /api/publish/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;
  const session = await getSession({ req })

  if (session) {
    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: true },
    });
    res.json(post);
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}
