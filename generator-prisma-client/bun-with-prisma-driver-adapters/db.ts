import 'dotenv/config'
import { PrismaClient } from './generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = `${process.env.DIRECT_URL}`

const adapter = new PrismaPg({ connectionString })

export const prisma = new PrismaClient({ adapter })
