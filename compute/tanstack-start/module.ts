import { module } from '@prisma/composer'
import { pnPostgres } from '@prisma/composer-prisma-cloud/prisma-next'

import { databaseContract } from './src/prisma/composer'
import service from './src/service'

export default module('prisma-compute-tanstack-start', ({ provision }) => {
  const database = provision(
    pnPostgres({
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
