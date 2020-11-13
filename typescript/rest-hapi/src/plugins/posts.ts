import Hapi from '@hapi/hapi'
import { PostGetPayload } from '@prisma/client'

// plugin to instantiate Prisma Client
const usersPlugin = {
  name: 'app/posts',
  dependencies: ['prisma'],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: 'POST',
        path: '/post',
        handler: createPostHandler,
      },
    ])

    server.route([
      {
        method: 'GET',
        path: '/feed',
        handler: feedHandler,
      },
    ])

    server.route([
      {
        method: 'GET',
        path: '/post/{postId}',
        handler: getPostHandler,
      },
    ])

    server.route([
      {
        method: 'GET',
        path: '/filterPosts',
        handler: filterPostsHandler,
      },
    ])

    server.route([
      {
        method: 'PUT',
        path: '/publish/{postId}',
        handler: publishHandler,
      },
    ])

    server.route([
      {
        method: 'DELETE',
        path: '/post/{postId}',
        handler: deleteHandler,
      },
    ])
  },
}

export default usersPlugin

async function feedHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app

  try {
    const createdPost = await prisma.post.findMany({
      where: { published: true },
      include: { author: true },
    })
    return h.response(createdPost).code(201)
  } catch (err) {
    console.log(err)
  }
}

async function getPostHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app

  const postId = parseInt(request.params.postId, 10)

  try {
    const post = await prisma.post.findOne({
      where: { id: postId },
    })
    return h.response(post || undefined).code(201)
  } catch (err) {
    console.log(err)
  }
}

async function filterPostsHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit,
) {
  const { prisma } = request.server.app

  const { searchString } = request.query

  try {
    const filteredPosts = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: searchString } },
          { content: { contains: searchString } },
        ],
      },
    })

    return h.response(filteredPosts).code(201)
  } catch (err) {
    console.log(err)
  }
}

async function publishHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app

  const postId = parseInt(request.params.postId, 10)

  try {
    const post = await prisma.post.update({
      where: { id: postId },
      data: { published: true }
    })
    return h.response(post || undefined).code(201)
  } catch (err) {
    console.log(err)
  }
}

async function deleteHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app

  const postId = parseInt(request.params.postId, 10)

  try {
    const post = await prisma.post.delete({
      where: { id: postId },
    })
    return h.response(post || undefined).code(201)
  } catch (err) {
    console.log(err)
  }
}


type PostCreateInput = PostGetPayload<{
  select: {
    title: true, 
    content: true, 
  }
}> & { authorEmail: string }

async function createPostHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit,
) {
  const { prisma } = request.server.app
  const payload = request.payload as PostCreateInput

  try {
    const createdPost = await prisma.post.create({
      data: {
        title: payload.title,
        content: payload.content,
        author: {
          connect: { email: payload.authorEmail },
        },
      },
      select: {
        id: true,
      },
    })
    return h.response(createdPost).code(201)
  } catch (err) {
    console.log(err)
  }
}
