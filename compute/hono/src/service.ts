import node from '@prisma/composer/node'
import { compute } from '@prisma/composer-prisma-cloud'
import { pnPostgres } from '@prisma/composer-prisma-cloud/prisma-next'

import { databaseContract } from './prisma/composer.ts'

export default compute({
  name: 'web',
  deps: { db: pnPostgres(databaseContract) },
  build: node({
    module: import.meta.url,
    dir: '../dist',
    entry: 'index.js',
  }),
})
