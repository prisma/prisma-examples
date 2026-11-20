import { secretString } from '@prisma/composer/arktype'
import node from '@prisma/composer/node'
import { compute, rawPostgres } from '@prisma/composer-prisma-cloud'
import { type } from 'arktype'

/**
 * The AdonisJS server as a Prisma Compute service. It needs a Postgres
 * database and an app key, and runs the production build in "build/".
 */
export default compute({
  name: 'web',
  deps: { db: rawPostgres() },
  input: type({ appKey: secretString() }),
  build: node({
    module: import.meta.url,
    dir: '../build',
    entry: 'bin/compute.js',
  }),
})
