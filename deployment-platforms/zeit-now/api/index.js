const express = require('express')

const { PrismaClient } = require('@prisma/client')
const client = new PrismaClient()

const app = express()

app.get('/users', async (req, res) => {
  // let users = await client.user.findMany()
  res.status(200).send({ todo: "" })
})

app.post('/users', async (req, res) => {
  // let users = await client.user.findMany()
  res.status(200).send(users)
})

app.delete('/users/:id', async (req, res) => {
  // let users = await client.user.findMany()
  res.status(200).send(users)
})

module.exports = app
