import { PrismaClient } from '@prisma/client'
import express from 'express'

export const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.post('/user', async (req, res) => {
  const { name, location } = req.body
  try {
    const response = await prisma.$queryRaw`
    insert into "User" ("name", "location") values
    (${name}, "public"."st_point"(${location.lng}, ${location.lat}))
    returning id` as any;

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
    // await prisma.$executeRaw`insert into Location (name, location) values (${name}, "public"."st_point"(${location.lng}, ${location.lat}))`
    await prisma.$queryRaw`insert into Location (name, location) values ( ${name} , "public"."st_point"( ${location.lng} , ${location.lat} ))`

    // const userId = 42
    // await prisma.$queryRaw`SELECT * FROM User WHERE id = ${userId};`

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
    const locations = await prisma.$queryRawUnsafe(
      'select * from "locations_near_user"($1, $2)',
      parseInt(userId),
      distance,
    )
    res.json({ data: { locations } })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      error: 'Server error!',
    })
  }
})

export { app }
