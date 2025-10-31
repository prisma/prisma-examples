import { getDb } from '@repo/database'
import { env } from './env/server'

const prisma = getDb({ connectionString: env.DATABASE_URL })
export default prisma
