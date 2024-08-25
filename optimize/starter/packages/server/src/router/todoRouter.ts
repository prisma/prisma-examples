import { z } from "zod";

import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";

export const todoRouter = trpc.router({
  list: trpc.procedure.query(() => {
    return prisma.todo.findMany({
      where: {
        isDeleted: false,
        title: {
          contains: "_",
        },
      },
    });
  }),
  create: trpc.procedure
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
  delete: trpc.procedure
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
  update: trpc.procedure
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
