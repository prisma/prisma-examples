import { PrismaClient } from '@prisma/client'
import { PubSub } from 'apollo-server'
import { Request, Response } from 'express'

export interface Context {
  prisma: PrismaClient
  req: Request
  res: Response
  pubsub: PubSub
}

const prisma = new PrismaClient()
const pubsub = new PubSub()

export const createContext = (ctx: any): Context => {
  return {
    ...ctx,
    prisma,
    pubsub,
  }
}
