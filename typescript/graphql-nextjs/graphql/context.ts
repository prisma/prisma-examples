import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

import prisma from "../lib/prisma"

export interface Context {
  db: PrismaClient
  user: { id: number; role: "admin" | "editor" | "user" }
}

export async function createContext(args: {
  req: NextApiRequest
  res: NextApiResponse
}): Promise<Context> {
  // fetch userId based on cookies and then findUnique with prisma
  const user = { id: 2, role: "admin" as const }

  return {
    db: prisma,
    user,
  }
}
