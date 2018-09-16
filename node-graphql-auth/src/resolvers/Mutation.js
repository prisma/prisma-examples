const { hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { APP_SECRET } = require('../utils')

const Mutation = {
  signup: async (parent, { name, email, password }, ctx) => {
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
  login: async (parent, { email, password }, ctx) => {
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
}

module.exports = {
  Mutation,
}
