import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url().startsWith('prisma+postgres://'),
    DIRECT_URL: z.string().url().startsWith('postgres://'),
  },
  runtimeEnv: process.env,
})
