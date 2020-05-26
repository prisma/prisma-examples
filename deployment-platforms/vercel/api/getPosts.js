import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async (req, res) => {
  try {
    const users = await prisma.post.findMany({
      include: { author_id: true }
    })
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}
