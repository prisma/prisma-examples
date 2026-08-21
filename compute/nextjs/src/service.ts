import nextjs from '@prisma/composer/nextjs'
import { compute } from '@prisma/composer-prisma-cloud'
import { pnPostgres } from '@prisma/composer-prisma-cloud/prisma-next'

import { databaseContract } from './prisma/composer'

export default compute({
  name: 'web',
  deps: { db: pnPostgres(databaseContract) },
  build: nextjs({
    module: import.meta.url,
    appDir: '..',
  }),
})
