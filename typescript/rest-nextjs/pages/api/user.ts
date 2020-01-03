import { Photon } from '@prisma/photon'

const photon = new Photon()

// POST /api/user
// Required fields in body: name, email
export default async function handle(req, res) {
  const result = await photon.users.create({
    data: {
      ...req.body
    },
  })
  res.json(result)
}