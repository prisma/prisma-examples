// import { inferAsyncReturnType, initTRPC } from "@trpc/server";
// import * as trpcExpress from "@trpc/server/adapters/express";

// export const createContext = (
//   _options: trpcExpress.CreateExpressContextOptions
// ) => {
//   return {};
// };

// type Context = inferAsyncReturnType<typeof createContext>;
// export const trpc = initTRPC.context<Context>().create();

import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
