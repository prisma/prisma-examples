import { prismaObjectType } from 'nexus-prisma'
import { stringArg, idArg } from 'nexus'
import { hash, compare } from 'bcrypt'
import { APP_SECRET, getUserId } from '../utils'
import { sign } from 'jsonwebtoken'

export const Mutation = prismaObjectType('Mutation', t => {
  t.field('signup', 'AuthPayload', {
    args: {
      name: stringArg({ nullable: true }),
      email: stringArg(),
      password: stringArg(),
    },
    resolve: async (parent, { name, email, password }, ctx) => {
      const hashedPassword = await hash(password, 10)
      const user = await ctx.prisma.createUser({
        name,
        email,
        password: hashedPassword,
      })
      return {
        token: sign({ userId: user.id }, APP_SECRET),
        user,
      }
    },
  })

  t.field('login', 'AuthPayload', {
    args: {
      email: stringArg(),
      password: stringArg(),
    },
    resolve: async (parent, { email, password }, context) => {
      const user = await context.prisma.user({ email })
      if (!user) {
        throw new Error(`No user found for email: ${email}`)
      }
      const passwordValid = await compare(password, user.password)
      if (!passwordValid) {
        throw new Error('Invalid password')
      }
      return {
        token: sign({ userId: user.id }, APP_SECRET),
        user,
      }
    },
  })

  t.field('createDraft', 'Post', {
    args: {
      title: stringArg(),
      content: stringArg({ nullable: true }),
    },
    resolve: (parent, { title, content }, ctx) => {
      const userId = getUserId(ctx)
      return ctx.prisma.createPost({
        title,
        content,
        author: { connect: { id: userId } },
      })
    },
  })

  t.field('deletePost', 'Post', {
    nullable: true,
    args: {
      id: idArg(),
    },
    resolve: (parent, { id }, ctx) => {
      return ctx.prisma.deletePost({ id })
    },
  })

  t.field('publish', 'Post', {
    nullable: true,
    args: {
      id: idArg(),
    },
    resolve: (parent, { id }, ctx) => {
      return ctx.prisma.updatePost({
        where: { id },
        data: { published: true },
      })
    },
  })
})
