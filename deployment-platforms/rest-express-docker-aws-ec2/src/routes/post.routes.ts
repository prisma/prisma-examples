import { Router, Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export const postRouter = Router()

// GET /feed — all published posts
postRouter.get('/feed', async (_req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  })
  res.json(posts)
})

// GET /post/:id — single post by id
postRouter.get('/post/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  })
  if (!post) {
    res.status(404).json({ error: `Post with ID ${id} not found` })
    return
  }
  res.json(post)
})

// POST /post — create post
postRouter.post('/post', async (req: Request, res: Response) => {
  const { title, content, authorEmail } = req.body
  const post = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(post)
})

// PUT /publish/:id — publish a post
postRouter.put('/publish/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { published: true },
    })
    res.json(post)
  } catch {
    res.status(404).json({ error: `Post with ID ${id} not found` })
  }
})

// DELETE /post/:id — delete post
postRouter.delete('/post/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const post = await prisma.post.delete({
      where: { id: Number(id) },
    })
    res.json(post)
  } catch {
    res.status(404).json({ error: `Post with ID ${id} not found` })
  }
})
