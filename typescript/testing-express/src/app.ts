import { PrismaClient } from '@prisma/client'
import * as bodyParser from 'body-parser'
import express from 'express'

export const prisma = new PrismaClient()
export const app = express()

app.use(bodyParser.json())

app.get(`/user`, async (_req, res) => {
  const result = await prisma.user.findMany()
  res.json(result)
})

app.post(`/user`, async (req, res) => {
  try {
    const result = await prisma.user.create({
      data: {
        ...req.body,
      },
    })
    res.json(result)
  } catch (e) {
    res.status(409).json({
      error: 'User already exists!',
    })
  }
})
