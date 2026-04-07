import { mutation, resolver } from '@gqloom/core'
import { PrismaResolverFactory } from '@gqloom/prisma'
import { useSelectedFields } from '@gqloom/prisma/context'
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
        email: z.email(),
        name: z.string().optional(),
        posts: z.array(PostCreateInput).default([]),
      }),
    })
    .resolve(({ data }) => {
      return prisma.user.create({
        select: useSelectedFields(User),
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
