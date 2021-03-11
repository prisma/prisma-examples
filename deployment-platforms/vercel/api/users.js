import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        include: { profiles: true },
      })
      res.status(200).json(users)
    } catch (error) {
      console.error(error)
      res.status(500).json(error)
    }
  } else if (req.method === 'POST') {
    try {
      const createdUser = await prisma.user.create({
        data: req.body,
      })
      res.status(200).json(createdUser)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          return res
            .status(409)
            .json({ error: 'A user with this email already exists' })
        }
      }
      console.error(e)
      return res.status(500)
    }
  } else {
    res.status(404)
  }
}
