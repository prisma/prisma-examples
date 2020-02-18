import { Photon } from '@prisma/photon'

const photon = new Photon()

// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(req, res) {
  console.log(`POST api/post`, req.body)
  const { title, content, authorEmail } = req.body
  const result = await photon.posts.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(result)
}