import * as path from 'node:path'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { PrismaClient } from './generated/prisma/client'

const url = `file:${path.join(__dirname, '../prisma/dev.db')}`

const adapter = new PrismaLibSQL({
  url,
})
export const prisma = new PrismaClient({
  adapter,
  log: [{ emit: 'stdout', level: 'query' }],
})
