const express = require('express')
const app = express()
const { Prisma } = require('../generated/prisma')
const bodyParser = require('body-parser')

const prisma = new Prisma({ debug: true })

app.use(bodyParser.json())

app.post(`/house`, async (req, res) => {
  const result = await prisma.createHouse(req.body)
  res.json(result)
})

app.get(`/house/:id`, async (req, res) => {
  const { id } = req.params
  const houses = await prisma.house({ id })
  res.json(houses)
})

app.get('/houses', async (req, res) => {
  const houses = await prisma.houses()
  res.json(houses)
})

app.get('/windows', async (req, res) => {
  const windows = await prisma.windows()
  res.json(windows)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
