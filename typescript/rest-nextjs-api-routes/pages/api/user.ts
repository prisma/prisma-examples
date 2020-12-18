import prisma from '../../lib/prisma'

// POST /api/user
// Required fields in body: name, email
export default async function handle(req, res) {
  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  })
  res.json(result)
}
