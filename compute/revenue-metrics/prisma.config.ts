import { defineConfig as composer } from '@prisma/composer/config'
import { nextjsBuild } from '@prisma/composer/nextjs/control'
import { prismaCloud, prismaState } from '@prisma/composer-prisma-cloud/control'
import { defineConfig as orm } from '@prisma/orm-postgres/config'
import { config } from 'dotenv'
import { definePrismaConfig } from 'prisma/config'

// Local settings come from .env.local, not .env: `next build` copies .env into
// the bundle that a deploy uploads. On Prisma Compute there is no file and
// Composer provides the database.
config({ path: '.env.local', quiet: true })

export default definePrismaConfig({
  composer: composer({
    entry: './module.ts',
    extensions: [prismaCloud({ region: 'us-east-1' }), nextjsBuild()],
    state: prismaState(),
  }),
  orm: orm({
    contract: './src/prisma/contract.prisma',
    db: {
      connection: process.env['DATABASE_URL']!,
    },
  }),
})
