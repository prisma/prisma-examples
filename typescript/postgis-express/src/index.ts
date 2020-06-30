import { PrismaClient } from '@prisma/client'
import * as bodyParser from 'body-parser'
import express from 'express'

const prisma = new PrismaClient({
  log: ['query'],
})
const app = express()
const PORT = 3000

app.use(bodyParser.json())

app.post('/user', async (req, res) => {
  const { name, location } = req.body
  try {
    await prisma.executeRaw`
    insert into "public"."User" ("name", "location") values
    (${name}, st_point(${location.lng}, ${location.lat}))
    `
    res.sendStatus(200)
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
    await prisma.executeRaw`
    insert into "public"."Location" ("name", "location") values
    (${name}, st_point(${location.lng}, ${location.lat}))
    `
    res.sendStatus(200)
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
    const locations = await prisma.queryRaw`
    select * from "public"."locations_near_user"(${parseInt(
      userId
    )}, ${distance})
    `
    res.json({ data: { locations } })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      error: 'Server error!',
    })
  }
})

export const server = app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
)
