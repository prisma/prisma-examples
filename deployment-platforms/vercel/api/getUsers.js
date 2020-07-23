import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { profiles: true }
    })
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}
