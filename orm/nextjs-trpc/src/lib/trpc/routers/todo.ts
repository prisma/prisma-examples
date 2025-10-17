import { TRPCError } from "@trpc/server";
import z from "zod";
import prisma from "../../../lib/db";
import { publicProcedure, router } from "../index";

export const todoRouter = router({
    getAll: publicProcedure.query(async () => {
        return await prisma.todo.findMany({
            orderBy: {
                id: "asc",
            },
        });
    }),

    create: publicProcedure
        .input(z.object({ text: z.string().min(1) }))
        .mutation(async ({ input }) => {
            return await prisma.todo.create({
                data: {
                    text: input.text,
                },
            });
        }),

    toggle: publicProcedure
        .input(z.object({ id: z.number(), completed: z.boolean() }))
        .mutation(async ({ input }) => {
            try {
                return await prisma.todo.update({
                    where: { id: input.id },
                    data: { completed: input.completed },
                });
            } catch (error) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Todo not found",
                });
            }
        }),

    delete: publicProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
            try {
                return await prisma.todo.delete({
                    where: { id: input.id },
                });
            } catch (error) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Todo not found",
                });
            }
        }),
});
