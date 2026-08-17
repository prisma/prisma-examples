import { module } from '@prisma/composer'
import { pnPostgres } from '@prisma/composer-prisma-cloud/prisma-next'

import { databaseContract } from './src/prisma/composer.ts'
import service from './src/service.ts'

export default module('prisma-compute-hono', ({ provision }) => {
  const database = provision(
    pnPostgres({
      name: 'database',
      contract: databaseContract,
      config: 'prisma-next.config.ts',
    }),
  )

  provision(service, {
    id: 'web',
    deps: { db: database },
  })
})
