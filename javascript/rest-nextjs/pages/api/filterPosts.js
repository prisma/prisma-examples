import { Photon } from '@prisma/photon'

const photon = new Photon()

// GET /api/filterPosts?searchString=:searchString
export default async function handle(req, res) {
  const { searchString } = req.query
  const resultPosts = await photon.posts.findMany({
    where: {
      OR: [
        {
          title: { contains: searchString, },
        },
        {
          content: { contains: searchString, },
        },
      ],
    },
  })
  res.json(resultPosts)
}