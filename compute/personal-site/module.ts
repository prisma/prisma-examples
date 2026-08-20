import { module } from '@prisma/composer'

import service from './src/service.ts'

export default module('prisma-compute-personal-site', ({ provision }) => {
  provision(service, {
    id: 'web',
    deps: {},
  })
})
