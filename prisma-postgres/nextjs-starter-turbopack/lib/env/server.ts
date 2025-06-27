import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DIRECT_URL: z.string().url().startsWith('postgres://'),
  },
  runtimeEnv: process.env,
})
