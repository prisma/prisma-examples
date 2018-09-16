const express = require('express')
const bodyParser = require('body-parser')
const { prisma } = require('./generated/prisma-client')

const app = express()

app.use(bodyParser.json())

app.post(`/draft`, async (req, res) => {
  const result = await prisma.createPost({
    ...req.body,
    author: { connect: { email: 'alice@prisma.io' } },
  })
  res.json(result)
})

app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post({ id })
  res.json(post)
})

app.get(`/delete/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.deletePost({ id })
  res.json(post)
})

app.get('/publish/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.updatePost({
    where: { id },
    data: { isPublished: true },
  })
  res.json(post)
})

app.get('/drafts', async (req, res) => {
  const draftPosts = await prisma.posts({ where: { isPublished: false } })
  res.json(draftPosts)
})

app.get('/feed', async (req, res) => {
  const posts = await prisma.posts({ where: { isPublished: true } })
  res.json(posts)
})

app.listen(3000, () =>
  console.log('Server is running on http://localhost:3000'),
)
