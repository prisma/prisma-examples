import { Photon } from '@prisma/photon'

const photon = new Photon()

export default async function handle(req, res) {
  console.log(JSON.stringify(req.method))
  const posts = await photon.posts.findMany({ where: { published: false } })
  res.json(posts)
}