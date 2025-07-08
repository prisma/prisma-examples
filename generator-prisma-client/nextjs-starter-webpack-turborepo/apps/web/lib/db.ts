import { getDb } from '@repo/database'
import { env } from './env/server'

const prisma = getDb({ connectionString: env.DIRECT_URL })
export default prisma
