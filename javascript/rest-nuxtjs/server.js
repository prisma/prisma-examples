const { Nuxt, Builder } = require('nuxt')
const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

// Body parser, to access `req.body`
app.post(`api/signup`, async (req, res) => {
  const { name, email, posts } = req.body

  const postData = posts ? posts.map((post) => {
    return { title: post.title, content: post.content || undefined }
  }) : []

  const result = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: postData
      }
    },
  })
  res.json(result)
})

app.post(`api/post`, async (req, res) => {
  const { title, content, authorEmail } = req.body
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(result)
})

app.put('api/post/:id/views', async (req, res) => {
  const { id } = req.params

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1
        }
      }
    })

    res.json(post)
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` })
  }
})

app.put('api/publish/:id', async (req, res) => {
  const { id } = req.params

  try {
    const postData = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: {
        published: true
      }
    })

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) || undefined },
      data: { published: !postData?.published },
    })
    res.json(updatedPost)
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` })
  }

})

app.delete(`api/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(post)
})

app.get('api/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.get('api/user/:id/drafts', async (req, res) => {
  const { id } = req.params

  const drafts = await prisma.user.findUnique({
    where: {
      id: Number(id),
    }
  }).posts({
    where: { published: false }
  })

  res.json(drafts)
})

app.get(`api/post/:id`, async (req, res) => {
  const { id } = req.params

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  })
  res.json(post)
})

app.get('/api/drafts', async (req, res) => {
  return prisma.post.findMany({
    where: {
      published: false
    }
  })
})

app.get('api/feed', async (req, res) => {

  const { searchString, skip, take, orderBy } = req.query

  const or = searchString ? {
    OR: [
      { title: { contains: searchString } },
      { content: { contains: searchString } },
    ],
  } : {}

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...or
    },
    include: { author: true },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      updatedAt: orderBy || undefined
    },
  })

  res.json(posts)
})

// We instantiate Nuxt.js with the options
const isProd = process.env.NODE_ENV === 'production'
const nuxt = new Nuxt({ dev: !isProd })
// No build in production
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)
app.listen(3000)
console.log('Server is listening on http://localhost:3000')
