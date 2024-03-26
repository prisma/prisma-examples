
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  signupUser: publicProcedure
    .input(z.object({
      name: z.string().nullable(),
      email: z.string().email(),
    }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.create({
        data: {
          email: input.email,
          name: input.name ? input.name : undefined
        }
      })
    }),
});
