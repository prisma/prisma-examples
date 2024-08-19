import express, { Application, NextFunction, Request, Response } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./router";
import cors from "cors";
import { createContext } from "./lib/trpc";

const app: Application = express();
app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createContext,
  })
);

const PORT: number = Number(process.env.PORT) || 4444;
app.listen(PORT, () => {
  console.log(`🚀 Server running on Port: ${PORT}`);
});
