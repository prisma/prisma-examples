import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PubSub } from 'graphql-subscriptions'

const prisma = new PrismaClient().$extends(withAccelerate())

export interface Context {
  prisma: typeof prisma
  pubsub: PubSub
}

const pubsub = new PubSub()

export const context: Context = {
  prisma: prisma,
  pubsub: pubsub,
}
