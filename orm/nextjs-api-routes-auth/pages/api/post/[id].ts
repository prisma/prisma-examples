import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma'


// DELETE /api/post/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;

  const session = await getSession({ req })

  if (req.method === "DELETE") {
    if (session) {
      const post = await prisma.post.delete({
        where: { id: Number(postId) },
      });
      res.json(post);
    } else {
      res.status(401).send({ message: 'Unauthorized' })
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
