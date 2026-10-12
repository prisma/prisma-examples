import 'dotenv/config'
import { defineConfig as composer } from '@prisma/composer/config'
import { nextjsBuild } from '@prisma/composer/nextjs/control'
import { prismaCloud, prismaState } from '@prisma/composer-prisma-cloud/control'
import { defineConfig as orm } from '@prisma/orm-postgres/config'
import { definePrismaConfig } from 'prisma/config'

export default definePrismaConfig({
  composer: composer({
    extensions: [prismaCloud(), nextjsBuild()],
    state: prismaState(),
  }),
  orm: orm({
    contract: './src/prisma/contract.prisma',
    db: {
      connection: process.env['DATABASE_URL']!,
    },
  }),
})
