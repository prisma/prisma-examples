import { module } from '@prisma/composer'
import { postgres } from '@prisma/composer-prisma-cloud/orm'

import { databaseContract } from './src/prisma/composer.ts'
import service from './src/service.ts'

export default module('prisma-compute-hono', ({ provision }) => {
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
