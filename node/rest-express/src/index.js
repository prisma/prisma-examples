const express = require('express')
const bodyParser = require('body-parser')
const { prisma } = require('./generated/prisma-client')

const app = express()

app.use(bodyParser.json())

app.post(`/user`, async (req, res) => {
  const result = await prisma.createUser({
    ...req.body,
  })
  res.json(result)
})

app.post(`/post`, async (req, res) => {
  const { title, content, authorEmail } = req.body
  const result = await prisma.createPost({
    title: title,
    content: content,
    author: { connect: { email: authorEmail } },
  })
  res.json(result)
})

app.put('/publish/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.updatePost({
    where: { id },
    data: { published: true },
  })
  res.json(post)
})

app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.deletePost({ id })
  res.json(post)
})

app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post({ id })
  res.json(post)
})

app.get('/feed', async (req, res) => {
  const posts = await prisma.posts({ where: { published: true } })
  res.json(posts)
})

app.get('/filterPosts', async (req, res) => {
  const { searchString } = req.query
  const draftPosts = await prisma.posts({
    where: {
      OR: [
        {
          title_contains: searchString,
        },
        {
          content_contains: searchString,
        },
      ],
    },
  })
  res.json(draftPosts)
})

app.listen(3000, () =>
  console.log('Server is running on http://localhost:3000'),
)
