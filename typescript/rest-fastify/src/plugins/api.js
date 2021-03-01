async function routes(fastify, options, done) {
  fastify.get(`/`, async function (req, res) {
    return { up: true }
  })

  fastify.post(`/user`, async function (req, res) {
    const { email, name } = req.body
    const result = await this.prisma.user.create({
      data: {
        email,
        name,
      },
    })
    return result
  })

  fastify.post(`/post`, async function (req, res) {
    const { title, content, authorEmail } = req.body
    const result = await this.prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { email: authorEmail } },
      },
    })
    return result
  })

  fastify.post(`/post/comment`, async function (req, res) {
    const { comment, postId, authorEmail } = req.body

    const result = await this.prisma.comment.create({
      data: {
        comment,
        post: { connect: { id: parseInt(postId) } },
        author: { connect: { email: authorEmail } },
      },
    })
    return result
  })

  fastify.post(`/post/like`, async function (req, res) {
    const { postId, userEmail } = req.body
    const result = await this.prisma.user.update({
      data: {
        likes: {
          connect: {
            id: parseInt(postId),
          },
        },
      },
      where: {
        email: userEmail,
      },
    })
    return result
  })

  fastify.delete(`/post/:id`, async function (req, res) {
    const { id } = req.params
    const post = await this.prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    })
    return post
  })

  fastify.get(`/post/:id`, async function (req, res) {
    const { id } = req.params
    const post = await this.prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        author: true,
      },
    })
    return post
  })

  fastify.get('/feed', async function (req, res) {
    const posts = await this.prisma.post.findMany({
      include: { author: { } },
      orderBy: [{ id: 'desc' }],
      take: 10,
    })
    return posts
  })

  fastify.get('/filterPosts', async function (req, res) {
    const { searchString } = req.query
    const draftPosts = await this.prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchString,
            },
          },
          {
            content: {
              contains: searchString,
            },
          },
        ],
      },
    })
    return draftPosts
  })
  done()
}

module.exports = routes
