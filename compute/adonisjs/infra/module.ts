import { module } from '@prisma/composer'
import { generatedParam, rawPostgres } from '@prisma/composer-prisma-cloud'

import service from './service.ts'

/**
 * The app Prisma Compute deploys: one Prisma Postgres database and the
 * AdonisJS server connected to it. Each environment gets its own database
 * and its own generated app key.
 */
export default module('adonisjs-prisma-postgres', ({ provision }) => {
  const database = provision(rawPostgres({ name: 'database' }))

  provision(service, {
    id: 'web',
    deps: { db: database },
    input: { appKey: generatedParam() },
  })
})
