import nextjs from '@prisma/composer/nextjs'
import { compute } from '@prisma/composer-prisma-cloud'
import { postgres } from '@prisma/composer-prisma-cloud/orm'

import { databaseContract } from './prisma/composer'

export default compute({
  name: 'web',
  deps: { db: postgres(databaseContract) },
  build: nextjs({
    module: import.meta.url,
    appDir: '..',
  }),
})
