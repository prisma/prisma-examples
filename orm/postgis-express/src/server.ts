import 'dotenv/config'
import { PrismaClient } from '../prisma/generated/client'
import express from 'express'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
export const prisma = new PrismaClient({ adapter }).$extends(withAccelerate())
const app = express()

app.use(express.json())

app.post('/user', async (req, res) => {
  const { name, location } = req.body
  try {
    const response: any = (await prisma.$queryRaw`
    insert into "User" ("name", "location") values
    (${name}, "public"."st_point"(${location.lng}, ${location.lat}))
    returning id`) as any

    res.json({
      success: true,
      id: response[0].id,
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      error: 'Server error!',
    })
  }
})

app.post('/location', async (req, res) => {
  const { name, location } = req.body
  try {
    await prisma.$queryRaw`
    insert into "Location" ("name", "location") values
    (${name}, "public"."st_point"(${location.lng}, ${location.lat}))
    `

    res.json({
      success: true,
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      error: 'Server error!',
    })
  }
})

app.get(`/:userId/nearby-places`, async (req, res) => {
  const { userId } = req.params
  const { d } = req.query
  const distance = parseInt(String(d)) || 5

  try {
    const locations = await prisma.$queryRaw`
      select * from "locations_near_user"(${parseInt(
      userId,
    )}::int, ${distance}::int)
    `
    res.json({ data: { locations } })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      error: 'Server error!',
    })
  }
})

export { app }
