import { defineConfig, env } from 'prisma/config'

// Note: this wouldn't be needed if `deno task --env-file=.env ...` was supported.
// See: https://github.com/denoland/deno/issues/27236 
import 'dotenv/config'

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
    seed: 'deno run --allow-all ./prisma/seed.ts',
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
})