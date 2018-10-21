import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { APP_SECRET, getUserId } from '../utils'

export const Mutation = {
  signup: async (_parent, { password, name, email }, ctx) => {
    const hashedPassword = await hash(password, 10)
    const user = await ctx.db.createUser({
      name,
      email,
      password: hashedPassword,
    })

    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user,
    }
  },
  login: async (_parent, { email, password }, ctx) => {
    const user = await ctx.db.user({ email })

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
  createDraft: async (parent, { title, content, authorEmail }, ctx) => {
    const userId = getUserId(ctx)

    const user = await ctx.db.user({ id: userId })

    const email = authorEmail

    if (user.email !== email) {
      throw new Error('Author Invalid')
    }

    return ctx.db.createPost({
      title,
      content,
      author: { connect: { email } },
    })
  },

  deletePost: async (parent, { id }, ctx) => {
    const userId = getUserId(ctx)
    const author = await ctx.db
      .post({ id })
      .author()
      .$fragment('{ id }')
    const authorId = author.id

    if (userId !== authorId) {
      throw new Error('Author Invalid')
    }

    ctx.db.deletePost({ id })
  },

  publish: async (parent, { id }, ctx) => {
    const userId = getUserId(ctx)
    const author = await ctx.db
      .post({ id })
      .author()
      .$fragment('{ id }')
    const authorId = author.id

    if (userId !== authorId) {
      throw new Error('Author Invalid')
    }

    return ctx.db.updatePost({
      where: { id },
      data: { isPublished: true },
    })
  },
}
