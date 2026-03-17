import { Router, Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export const userRouter = Router()

// POST /user — create user
userRouter.post('/user', async (req: Request, res: Response) => {
  const { email, name } = req.body
  const user = await prisma.user.create({
    data: { email, name },
  })
  res.json(user)
})
