import node from '@prisma/composer/node'
import { compute } from '@prisma/composer-prisma-cloud'

export default compute({
  name: 'web',
  deps: {},
  build: node({
    module: import.meta.url,
    dir: '../dist',
    entry: 'server/entry.mjs',
    // Astro's Node adapter leaves packages as imports, so deploy stages them
    // from node_modules.
    dependencies: 'external',
  }),
})
