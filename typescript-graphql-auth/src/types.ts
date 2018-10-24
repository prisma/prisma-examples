import { Prisma } from './generated/prisma-client'

export interface Context {
  db: Prisma
}
export interface AuthPayload {
  token: string
  user: any
}
