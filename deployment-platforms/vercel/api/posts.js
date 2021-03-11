import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const users = await prisma.post.findMany({
        include: { author: true },
      })
      res.status(200).json(users)
    } catch (error) {
      console.error(error)
      res.status(500).json(error)
    }
  } else if (req.method === 'POST') {
    const { title, content, authorEmail } = req.body
    try {
      const createdPost = await prisma.post.create({
        data: {
          title,
          content,
          author: {
            connect: {
              email: authorEmail,
            },
          },
        },
      })
      res.status(200).json(createdPost)
    } catch (e) {
      console.error(e)
      return res.status(500)
    }
  } else {
    res.status(404)
  }
}
  