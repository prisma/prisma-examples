import { defineConfig } from '@prisma/composer/config'
import { nextjsBuild } from '@prisma/composer/nextjs/control'
import { prismaCloud, prismaState } from '@prisma/composer-prisma-cloud/control'

export default defineConfig({
  extensions: [prismaCloud(), nextjsBuild()],
  state: prismaState(),
})
