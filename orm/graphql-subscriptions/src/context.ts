import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../prisma/generated/client'
import { PubSub } from 'graphql-subscriptions'

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter: pool })

export interface Context {
  prisma: typeof prisma
  pubsub: PubSub
}

const pubsub = new PubSub()

export const context: Context = {
  prisma: prisma,
  pubsub: pubsub,
}
