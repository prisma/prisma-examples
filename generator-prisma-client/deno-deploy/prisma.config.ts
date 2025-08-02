import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
    seed: 'deno run --allow-all --env-file=.env ./prisma/seed.ts',
  },
})
