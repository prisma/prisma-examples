
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "../db";

type CreateContextOptions = Record<string, never>;

const createInnerTRPCContext = (_opts: CreateContextOptions) => {
  return {
    prisma,
  };
};

export const createTRPCContext = (_opts: CreateNextContextOptions) => {
  return createInnerTRPCContext({});
};


const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
