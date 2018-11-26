import { Prisma } from './generated/prisma-client'

export interface Context {
  prisma
  request: any
}

export interface AuthPayload {
  token: string
  user: any
}
