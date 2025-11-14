import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url().startsWith('postgresql://'),
  },
  runtimeEnv: process.env,
})
