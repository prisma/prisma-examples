/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { SERVER_ENV } from "~/env/envFlags.server";

function buildClient() {
  const client = new PrismaClient({
    //log: ["query", "info", "warn", "error"],
  }).$extends(withAccelerate());

  return client;
}

/**
 * The type of the PrismaClient with extensions
 */
export type PrismaClientType = ReturnType<typeof buildClient>;

let prisma: PrismaClientType;

declare global {
  let __prisma: PrismaClientType | undefined;
}

// This is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (SERVER_ENV.NODE_ENV === "production") {
  prisma = buildClient();
  prisma.$connect();
} else {
  if (!(global as any).__prisma) {
    (global as any).__prisma = buildClient();
    (global as any).__prisma.$connect();
  }
  prisma = (global as any).__prisma;
}

export default prisma;
