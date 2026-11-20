import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  /**
   * Default connection used for all queries.
   */
  connection: 'pg',

  /**
   * Pretty-print SQL debug output in development logs.
   */
  prettyPrintDebugQueries: true,

  connections: {
    /**
     * Prisma Postgres, over a standard PostgreSQL connection string.
     */
    pg: {
      client: 'pg',
      connection: {
        connectionString: env.get('DATABASE_URL'),
      },
      /**
       * Prisma Compute scales to zero and closes idle connections. A pool
       * that keeps no idle connections never hands out a dead one.
       */
      pool: {
        min: 0,
        max: 5,
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
      schemaGeneration: {
        enabled: true,
        rulesPaths: ['./database/schema_rules.js'],
      },
      /**
       * Emit SQL queries to the logger in development.
       */
      debug: app.inDev,
    },
  },
})

export default dbConfig
