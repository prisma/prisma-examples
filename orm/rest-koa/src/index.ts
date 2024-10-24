import Koa from 'koa'
import Router from '@koa/router'

import { Prisma, PrismaClient } from '@prisma/client'

import { koaBody } from 'koa-body'

const app = new Koa()
const router = new Router()

const prisma = new PrismaClient()

app.use(koaBody())

router.post('/signup', async (ctx) => {
  const { name, email, posts } = ctx.request.body

  const postData = posts
    ? posts.map((post: Prisma.PostCreateInput) => {
      return { title: post.title, content: post.content || undefined }
    })
    : []

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: postData,
      },
    },
  })

  ctx.status = 201 // Created
  ctx.body = newUser
})

router.post('/post', async (ctx) => {
  const { title, content, authorEmail: email } = ctx.request.body
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email } },
    },
  })
  ctx.status = 201 // Created
  ctx.body = newPost
})

router.put('/post/:id/views', async (ctx) => {
  const id = Number(ctx.params.id)

  try {
    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })

    ctx.body = post
  } catch {
    ctx.status = 404
    ctx.body = { error: `Post with ID ${id} does not exist in the database` }
  }
})

router.put('/publish/:id', async (ctx) => {
  const id = Number(ctx.params.id)
  const postToUpdate = await prisma.post.findUnique({
    where: {
      id,
    },
  })

  if (!postToUpdate) {
    ctx.status = 404
    ctx.body = { error: `Post with ID ${id} does not exist in the database` }
    return
  }

  const updatedPost = await prisma.post.update({
    where: {
      id,
    },
    data: {
      published: !postToUpdate.published,
    },
  })

  ctx.body = updatedPost
})

router.delete('/post/:id', async (ctx) => {
  const id = Number(ctx.params.id)
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id,
      },
    })

    ctx.body = deletedPost
  } catch {
    ctx.status = 404
    ctx.body = { error: `Post with ID ${id} does not exist in the database` }
  }
})

router.get('/users', async (ctx) => {
  const users = await prisma.user.findMany()

  ctx.body = users
})

router.get('/user/:id/drafts', async (ctx) => {
  const id = Number(ctx.params.id)

  const drafts = await prisma.user
    .findUnique({
      where: {
        id,
      },
    })
    .posts({
      where: { published: false },
    })

  ctx.body = drafts
})

router.get('/post/:id', async (ctx) => {
  const id = Number(ctx.params.id)
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  })

  ctx.body = post
})

router.get('/feed', async (ctx) => {
  const { searchString, skip, take, orderBy } = ctx.query

  const or = searchString
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
  ctx.body = posts
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-koa#3-using-the-rest-api`),
)
