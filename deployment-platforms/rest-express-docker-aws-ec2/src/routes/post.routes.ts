import { Router, Request, Response } from 'express'
import { Prisma } from '../../prisma/generated/client'
import { prisma } from '../lib/prisma'

export const postRouter = Router()

function parsePostId(id: string | string[], res: Response): number | null {
  const postId = Number(id)
  if (!Number.isInteger(postId) || postId <= 0) {
    res.status(400).json({ error: `Invalid post ID: ${id}` })
    return null
  }
  return postId
}

// GET /feed — all published posts
postRouter.get('/feed', async (_req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: true },
    })
    res.json(posts)
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /post/:id — single post by id
postRouter.get('/post/:id', async (req: Request, res: Response) => {
  const postId = parsePostId(req.params.id, res)
  if (postId === null) return
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    })
    if (!post) {
      res.status(404).json({ error: `Post with ID ${req.params.id} not found` })
      return
    }
    res.json(post)
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// POST /post — create post
postRouter.post('/post', async (req: Request, res: Response) => {
  const { title, authorEmail, content } = req.body
  if (!title || !authorEmail) {
    res.status(400).json({ error: 'title and authorEmail are required' })
    return
  }
  try {
    const author = await prisma.user.findUnique({ where: { email: authorEmail } })
    if (!author) {
      res.status(404).json({ error: `No user found for email: ${authorEmail}` })
      return
    }
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { email: authorEmail } },
      },
    })
    res.status(201).json(post)
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// PUT /publish/:id — publish a post
postRouter.put('/publish/:id', async (req: Request, res: Response) => {
  const postId = parsePostId(req.params.id, res)
  if (postId === null) return
  try {
    const post = await prisma.post.update({
      where: { id: postId },
      data: { published: true },
    })
    res.json(post)
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      res.status(404).json({ error: `Post with ID ${req.params.id} not found` })
      return
    }
    res.status(500).json({ error: 'Internal server error' })
  }
})

// DELETE /post/:id — delete post
postRouter.delete('/post/:id', async (req: Request, res: Response) => {
  const postId = parsePostId(req.params.id, res)
  if (postId === null) return
  try {
    const post = await prisma.post.delete({
      where: { id: postId },
    })
    res.json(post)
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      res.status(404).json({ error: `Post with ID ${req.params.id} not found` })
      return
    }
    res.status(500).json({ error: 'Internal server error' })
  }
})
