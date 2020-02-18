import { Photon } from '@prisma/photon'

const photon = new Photon()

// PUT /api/publish/:id
export default async function handle(req, res) {
  const postId = req.query.id
  const post = await photon.posts.update({
    where: { id: postId },
    data: { published: true }
  })
  console.log(post)
  res.json(post)
}