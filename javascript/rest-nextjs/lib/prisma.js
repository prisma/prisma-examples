import { PrismaClient } from "@prisma/client";

let prisma

if (process.env.NODE_ENV === "production") {
  // In production, create a new instance of PrismaClient
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    // In development, create a new global instance of PrismaClient to prevent hot reloading from creating new instances
    global.prisma = new PrismaClient()
  }

  prisma = global.prisma
}

export default prisma
