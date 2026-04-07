import { field, mutation, query, resolver } from '@gqloom/core'
import * as z from 'zod'
import { Post } from '../generated/gqloom'
import { PrismaResolverFactory } from '@gqloom/prisma'
import { useSelectedFields } from '@gqloom/prisma/context'
import { prisma } from '../db'

export const PostCreateInput = z.object({
  __typename: z.literal('PostCreateInput').nullish(),
  title: z.string(),
  content: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
}).transform(({ __typename, ...rest }) => rest)

const postFactory = new PrismaResolverFactory(Post, prisma)

export const postResolver = resolver.of(Post, {
  authorId: field.hidden,
  author: postFactory.relationField('author'),

  postById: query(Post.nullable())
    .input({
      id: z.int(),
    })
    .resolve(({ id }) =>
      prisma.post.findUnique({
        select: useSelectedFields(Post),
        where: { id },
      }),
    ),

  feed: query(Post.list())
    .input({
      searchString: z.string().nullish(),
      skip: z
        .number()
        .int()
        .nullish()
        .transform((x) => x ?? undefined),
      take: z
        .number()
        .int()
        .nullish()
        .transform((x) => x ?? undefined),
      orderBy: z
        .object({
          updatedAt: z
            .enum(['asc', 'desc'])
            .nullish()
            .transform((x) => x ?? undefined),
        })
        .nullish()
        .transform((x) => x ?? undefined),
    })
    .resolve(({ searchString, skip, take, orderBy }) => {
      const or = searchString
        ? {
            OR: [
              { title: { contains: searchString, mode: 'insensitive' } },
              { content: { contains: searchString, mode: 'insensitive' } },
            ],
          }
        : {}

      return prisma.post.findMany({
        select: useSelectedFields(Post),
        where: { ...or, published: true },
        take,
        skip,
        orderBy,
      })
    }),
  draftsByUser: query(Post.list())
    .input({
      userUniqueInput: z.object({
        __typename: z.literal('UserUniqueInput').nullish(),
        id: z
          .number()
          .int()
          .nullish()
          .transform((x) => x ?? undefined),
        email: z
          .email()
          .nullish()
          .transform((x) => x ?? undefined),
      }),
    })
    .resolve(({ userUniqueInput }) => {
      return prisma.post.findMany({
        select: useSelectedFields(Post),
        where: {
          published: false,
          author: {
            is: {
              id: userUniqueInput.id,
              email: userUniqueInput.email,
            },
          },
        },
      })
    }),
  createDraft: mutation(Post)
    .input({
      data: PostCreateInput,
      authorEmail: z.email(),
    })
    .resolve(({ data, authorEmail }) => {
      return prisma.post.create({
        select: useSelectedFields(Post),
        data: {
          title: data.title,
          content: data.content,
          published: false,
          author: {
            connect: { email: authorEmail },
          },
        },
      })
    }),

  togglePublishPost: mutation(Post)
    .input({
      id: z.number().int(),
    })
    .resolve(async ({ id }) => {
      // TODO: Simplify once https://github.com/prisma/prisma/issues/16715 is fixed
      const postPublished = await prisma.post.findUnique({
        where: { id },
        select: { published: true },
      })
      if (!postPublished) {
        throw new Error('Post not found')
      }
      return prisma.post.update({
        select: useSelectedFields(Post),
        where: { id },
        data: { published: !postPublished?.published },
      })
    }),

  incrementPostViewCount: mutation(Post)
    .input({
      id: z.int(),
    })
    .resolve(({ id }) => {
      return prisma.post.update({
        select: useSelectedFields(Post),
        where: { id },
        data: { viewCount: { increment: 1 } },
      })
    }),

  deletePost: mutation(Post)
    .input({
      id: z.int(),
    })
    .resolve(({ id }) => {
      return prisma.post.delete({
        select: useSelectedFields(Post),
        where: { id },
      })
    }),
})
