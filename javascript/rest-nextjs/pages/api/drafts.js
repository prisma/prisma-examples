import { Photon } from '@prisma/photon'

const photon = new Photon()

export default async function handle(req, res) {
  const posts = await photon.posts.findMany({
    where: { published: false },
    include: {
      author: true,
    },
  })
  res.json(posts)
}
