import 'dotenv/config'
import { PrismaClient } from '../prisma/generated/client.js'
import { PrismaPg } from '@prisma/adapter-pg'
import express from 'express'

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
export const prisma = new PrismaClient({ adapter: pool })
export const app = express()

app.use(express.json())

app.get(`/user`, async (_req, res) => {
  const result = await prisma.user.findMany()
  res.json(result)
})

app.post(`/user`, async (req, res) => {
  const { name, email } = req.body
  try {
    const result = await prisma.user.create({
      data: {
        name,
        email,
      },
    })
    res.json(result)
  } catch (e) {
    res.status(409).json({
      error: 'User already exists!',
    })
  }
})
