import { PrismaClient } from '@prisma/client'
import express from 'express'

export const prisma = new PrismaClient()
var cookieParser = require('cookie-parser')
var csrf = require('csurf')
var bodyParser = require('body-parser')
const app = express()

// setup route middlewares
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser())

app.get('/form', csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  res.render('send', { csrfToken: req.csrfToken() })
})
 
app.post('/process', parseForm, csrfProtection, function (req, res) {
  res.send('data is being processed')
})

app.use(express.json())

app.post('/user', async (req, res) => {
  const { name, location } = req.body
  try {
    const response: any = await prisma.$queryRaw`
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
      select * from "locations_near_user"(${parseInt(userId)}, ${distance})
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
