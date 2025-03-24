import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate()) // If you're not using Prisma Postgres, remove `.$extends(withAccelerate())`

export default prisma
