import { configApp } from '@adonisjs/eslint-config'

export default configApp({
  ignores: ['.prisma/**', '.prisma-composer/**', '.alchemy/**'],
})
