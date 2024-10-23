import express, { Request } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'
import crypto from 'crypto'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

declare global {
  namespace Express {
    interface Request {
      user?: import("@prisma/client").User;
    }
  }
}

app.post('/signup', async (req, res) => {
  try {
    const { email, password, posts } = req.body

    const postData = posts?.map((post: Prisma.PostCreateInput) => {
      return { title: post?.title, content: post?.content }
    })

    const emailCheck = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (emailCheck) {
      return res.status(400).json({ error: 'Email already in use' })
    }

    const result = await prisma.user.create({
      data: {
        email,
        password: await argon2.hash(password),
        sessionId: crypto.randomBytes(32).toString('base64'),
        posts: {
          create: postData,
        },
      },
    })

    const accessToken: string = jwt.sign({ userId: result.id, sessionId: result.sessionId }, 'secret')

    return res.status(201).json({ accessToken })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    if (await argon2.verify(user.password, password)) {
      const result = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          sessionId: crypto.randomBytes(32).toString('base64'),
        },
      })
  
      const accessToken = jwt.sign({ userId: result.id, sessionId: result.sessionId }, 'secret')
  
      return res.json({ accessToken: accessToken })
    } else {
      return res.json({ error: 'Invalid password' })
    }
  } catch (error) {
    
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/logout', async (req: Request, res) => {
  try {
    await prisma.user.update({
      where: {
        id: req.user?.id
      },
      data: {
        sessionId: null,
      },
    })

    return res.status(200).json({})
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.post(`/post`, async (req, res) => {
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

app.put('/post/:id/views', async (req, res) => {
  const { id } = req.params

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })

    res.json(post)
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` })
  }
})

app.put('/publish/:id', async (req, res) => {
  const { id } = req.params

  try {
    const postData = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: {
        published: true,
      },
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

app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(post)
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.get('/user/:id/drafts', async (req, res) => {
  const { id } = req.params

  const drafts = await prisma.user
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .posts({
      where: { published: false },
    })

  res.json(drafts)
})

app.get(`/post/:id`, async (req, res) => {
  const { id }: { id?: string } = req.params

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  })
  res.json(post)
})

app.get('/feed', async (req, res) => {
  const { searchString, skip, take, orderBy } = req.query

  const or: Prisma.PostWhereInput = searchString
    ? {
        OR: [
          { title: { contains: searchString as string } },
          { content: { contains: searchString as string } },
        ],
      }
    : {}

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...or,
    },
    include: { author: true },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      updatedAt: orderBy as Prisma.SortOrder,
    },
  })

  res.json(posts)
})

app.listen(3000, () => console.log(`🚀 Server ready at: http://localhost:3000`))
