import { Prisma } from '../prisma-client'

export interface Context {
  db: Prisma
}
