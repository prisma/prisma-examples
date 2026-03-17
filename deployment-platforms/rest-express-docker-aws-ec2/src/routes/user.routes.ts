import { Router, Request, Response } from 'express'
import { Prisma } from '../../prisma/generated/client'
import { prisma } from '../lib/prisma'

export const userRouter = Router()

// POST /user — create user
userRouter.post('/user', async (req: Request, res: Response) => {
  const { email, name } = req.body
  if (!email) {
    res.status(400).json({ error: 'email is required' })
    return
  }
  if (typeof email !== 'string' || !email.includes('@')) {
    res.status(400).json({ error: 'email must be a valid email address' })
    return
  }
  try {
    const user = await prisma.user.create({
      data: { email, name },
    })
    res.status(201).json(user)
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      res.status(409).json({ error: `Email ${email} is already in use` })
      return
    }
    res.status(500).json({ error: 'Internal server error' })
  }
})
