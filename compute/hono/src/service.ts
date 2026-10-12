import node from '@prisma/composer/node'
import { compute } from '@prisma/composer-prisma-cloud'
import { postgres } from '@prisma/composer-prisma-cloud/orm'

import { databaseContract } from './prisma/composer.ts'

export default compute({
  name: 'web',
  deps: { db: postgres(databaseContract) },
  build: node({
    module: import.meta.url,
    dir: '../dist',
    entry: 'index.js',
    // tsc leaves packages as imports, so deploy stages them from node_modules.
    dependencies: 'external',
  }),
})
