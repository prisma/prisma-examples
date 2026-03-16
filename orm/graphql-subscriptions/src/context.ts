import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../prisma/generated/client'
import { PubSub } from 'graphql-subscriptions'

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter: pool })
type SubscriptionEvents = {
  newPost: Awaited<ReturnType<typeof prisma.post.create>>
  postPublished: Awaited<ReturnType<typeof prisma.post.create>>
}

export interface Context {
  prisma: typeof prisma
  pubsub: PubSub<SubscriptionEvents>
}

const pubsub = new PubSub<SubscriptionEvents>()

export const context: Context = {
  prisma: prisma,
  pubsub: pubsub,
}
