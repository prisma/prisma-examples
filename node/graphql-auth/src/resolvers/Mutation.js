const { hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

const Mutation = {
  signup: async (parent, { name, email, password }, context) => {
    const hashedPassword = await hash(password, 10)
    const user = await context.db.createUser({
      name,
      email,
      password: hashedPassword,
    })

    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user,
    }
  },
  login: async (parent, { email, password }, context) => {
    const user = await context.db.user({ email })

    if (!user) {
      throw new Error(`No user found for email: ${email}`)
    }

    const valid = await compare(password, user.password)

    if (!valid) {
      throw new Error('Invalid password')
    }

    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user,
    }
  },
  createDraft: async (parent, { title, content }, context) => {
    const userId = getUserId(context)

    return context.db.createPost({
      title,
      content,
      author: { connect: { id: userId } },
    })
  },

  deletePost: async (parent, { id }, context) => {
    const userId = getUserId(context)
    const author = await context.db
      .post({ id })
      .author()
      .$fragment('{ id }')
    const authorId = author.id

    if (userId !== authorId) {
      throw new Error('Author Invalid')
    }

    return context.db.deletePost({ id })
  },

  publish: async (parent, { id }, context) => {
    return context.db.updatePost({
      where: { id },
      data: { published: true },
    })
  },
}

module.exports = {
  Mutation,
}
