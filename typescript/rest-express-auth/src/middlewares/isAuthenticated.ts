import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
      return res.status(401).json({ error: 'Missing authorization header' })
    }

    const [authMethod, accessToken] = authHeader.split(' ')

    if (authMethod !== 'Bearer' || !accessToken) {
      return res.status(401).json({ error: 'Invalid authorization header' })
    }

    const tokenBody: any = jwt.verify(accessToken, 'secret')

    const user = await prisma.user.findUnique({
      where: {
        id: tokenBody.userId,
      },
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid authorization token' })
    }

    req.user = user

    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid authorization token' })
  }
}
