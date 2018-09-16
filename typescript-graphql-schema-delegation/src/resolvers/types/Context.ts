import { Prisma as PrismaBinding } from 'prisma-binding'
import { Prisma } from '../../generated/prisma-client'

export interface Context {
  db: Prisma
  binding: PrismaBinding
}
