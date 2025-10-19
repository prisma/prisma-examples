import { mutation, resolver } from '@gqloom/core'
import { PrismaResolverFactory } from '@gqloom/prisma'
import * as z from 'zod'
import { User } from '../generated/gqloom'
import { prisma } from '../db'
import { PostCreateInput } from './post'

const userFactory = new PrismaResolverFactory(User, prisma)

export const userResolver = resolver.of(User, {
  users: userFactory.findManyQuery(),

  posts: userFactory.relationField('posts'),

  signupUser: mutation(User)
    .input({
      data: z.object({
        email: z.string(),
        name: z.string().optional(),
        posts: z.array(PostCreateInput),
      }),
    })
    .resolve(({ data }) => {
      return prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          posts: {
            create: data.posts,
          },
        },
      })
    }),
})
