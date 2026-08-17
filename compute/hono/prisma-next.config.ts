import 'dotenv/config'
import { defineConfig } from '@prisma/orm-postgres/config'

export default defineConfig({
  contract: './src/prisma/contract.prisma',
  db: {
    connection: process.env['DATABASE_URL']!,
  },
})
