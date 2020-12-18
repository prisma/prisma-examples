import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

export default async (req, res) => {
  try {
    const createdUser = await prisma.user.create({
      data: req.body
    })
    res.status(200).json(createdUser)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientRequestError) {
      if (e.code === 'P2002') {
        return res
          .status(409)
          .json({ error: 'A user with this email already exists' })
      }
    }
    console.error(e)
    return res.status(500)
  }
}
