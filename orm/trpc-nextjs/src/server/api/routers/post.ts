import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "../../db";

export const postRouter = createTRPCRouter({
  /**
   * Queries
   */
  feed: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: true
      }
    })
  }),
  drafts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      where: {
        published: false,
      },
      include: {
        author: true,
      }
    });
  }),
  postById: publicProcedure
    .input(z.object({
      id: z.number()
    }))
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findUnique({
        where: {
          id: input.id
        },
        include: {
          author: true,
        }
      })
    }),
  /** 
   * This query isn't used in the app but it's useful for learning how to filter data with Prisma
   */
  filterPosts: publicProcedure
    .input(z.object({
      searchString: z.string().nullable()
    }))
    .query(({ ctx, input }) => {

      const or = input.searchString
        ? {
          OR: [
            { title: { contains: input.searchString } },
            { content: { contains: input.searchString } },
          ],
        }
        : {}

      return prisma.post.findMany({
        where: { ...or }
      })
    }),
  /**
   * mutations
   */
  createDraft: publicProcedure
    .input(z.object({
      title: z.string(),
      content: z.string().nullable(),
      authorEmail: z.string(),
    }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content ? input.content : undefined,
          author: {
            connect: {
              email: input.authorEmail
            }
          }
        }
      })
    }),
  publish: publicProcedure
    .input(z.object({
      id: z.number()
    }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          published: true,
        }
      })
    }),
  deletePost: publicProcedure
    .input(z.object({
      id: z.number()
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.delete({
        where: {
          id: input.id
        }
      })
    }),

});
