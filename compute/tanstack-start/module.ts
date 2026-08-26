import { module } from '@prisma/composer'
import { postgres } from '@prisma/composer-prisma-cloud/orm'

import { databaseContract } from './src/prisma/composer'
import service from './src/service'

export default module('prisma-compute-tanstack-start', ({ provision }) => {
  const database = provision(
    postgres({
      name: 'database',
      contract: databaseContract,
      config: 'prisma.config.ts',
    }),
  )

  provision(service, {
    id: 'web',
    deps: { db: database },
  })
})
