import { z } from "zod";

import { prisma } from "../lib/prismaClient";
import { publicProcedure, router } from "../lib/trpc";

export const todoRouter = router({
  list: publicProcedure.query(() => {
    return prisma.todo.findMany({
      where: {
        isDeleted: false,
        title: {
          contains: "_",
        },
      },
    });
  }),
  create: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      const { title } = input;

      if (!title) {
        return null;
      }

      return prisma.todo.create({
        data: {
          title: input.title,
        },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          isDeleted: true,
        },
      });
    }),
  update: publicProcedure
    .input(z.object({ id: z.string(), isCompleted: z.boolean() }))
    .mutation(({ input }) => {
      return prisma.todo.update({
        where: {
          id: input.id,
          isDeleted: false,
        },
        data: {
          isCompleted: input.isCompleted,
        },
      });
    }),
});
