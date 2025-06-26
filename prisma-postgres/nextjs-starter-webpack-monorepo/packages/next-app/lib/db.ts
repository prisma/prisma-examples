import { getDb } from '@nextjs-starter-webpack-monorepo/prisma'
import { env } from './env/server'

const prisma = getDb({ connectionString: env.DIRECT_URL })
export default prisma
