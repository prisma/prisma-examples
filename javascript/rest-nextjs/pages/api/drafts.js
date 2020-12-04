import prisma from '../../lib/prisma'

export default async function handle(req, res) {
  const posts = await prisma.post.findMany({
    where: { published: false },
    include: { author: true },
  })
  res.json(posts)
}
