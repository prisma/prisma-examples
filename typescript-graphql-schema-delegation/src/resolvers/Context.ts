import { Prisma } from '../generated'

export interface Context {
  db: Prisma
  request: any
}
