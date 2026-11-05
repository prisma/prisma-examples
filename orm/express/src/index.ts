import 'dotenv/config'
import { Prisma, PrismaClient } from '../prisma/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'
import express, { NextFunction, Request, Response } from 'express'

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter: pool })

const app = express()

app.use(express.json())

// WARNING: this example has no real authentication. The `x-user-id` header is a
// placeholder for "the id of the logged-in user" and can be set to anything by
// any client. Before shipping this to production, replace `getCurrentUserId`
// with a real auth check (e.g. a verified session cookie or JWT) — the
// ownership checks below only protect your data once that id can be trusted.
function getCurrentUserId(req: Request): number | undefined {
  const userId = Number(req.header('x-user-id'))
  return Number.isInteger(userId) && userId > 0 ? userId : undefined
}

function requireUser(req: Request, res: Response, next: NextFunction) {
  const userId = getCurrentUserId(req)
  if (!userId) {
    res.status(401).json({ error: 'Authentication required' })
    return
  }
  res.locals.userId = userId
  next()
}

// `Post.id` is a PostgreSQL `INTEGER`, so ids outside this range can't exist
// and would make Prisma throw instead of finding nothing.
const MAX_POST_ID = 2_147_483_647

// Loads the post and makes sure the current user is its author. Sends the
// error response itself and returns `null` when the request must stop.
async function findOwnedPost(id: number, res: Response) {
  const post =
    Number.isInteger(id) && id >= 1 && id <= MAX_POST_ID
      ? await prisma.post.findUnique({ where: { id } })
      : null
  if (!post) {
    res.status(404).json({ error: `Post with ID ${id} does not exist in the database` })
    return null
  }
  if (post.authorId !== res.locals.userId) {
    res.status(403).json({ error: 'You can only modify your own posts' })
    return null
  }
  return post
}

app.post(`/signup`, async (req, res) => {
  const { name, email, posts } = req.body

  const postData = posts?.map((post: Prisma.PostCreateInput) => {
    return { title: post?.title, content: post?.content }
  })

  const result = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: postData,
      },
    },
  })
  res.json(result)
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

// Counting a view is something every reader does, so this route is public on
// purpose — an ownership check would mean only the author could add views.
// In production, protect it against inflation with rate limiting and/or
// de-duplication (e.g. one view per user or session).
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

app.put('/publish/:id', requireUser, async (req, res) => {
  const { id } = req.params

  const post = await findOwnedPost(Number(id), res)
  if (!post) return

  const updatedPost = await prisma.post.update({
    where: { id: post.id },
    data: { published: !post.published },
  })
  res.json(updatedPost)
})

app.delete(`/post/:id`, requireUser, async (req, res) => {
  const { id } = req.params

  const post = await findOwnedPost(Number(id), res)
  if (!post) return

  const deletedPost = await prisma.post.delete({
    where: { id: post.id },
  })
  res.json(deletedPost)
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.get('/user/:id/drafts', async (req, res) => {
  const { id } = req.params

  const drafts = await prisma.post.findMany({
    where: {
      authorId: Number(id),
      published: false,
    },
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

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: https://github.com/prisma/prisma-examples/blob/latest/orm/express/README.md#using-the-rest-api`),
)
