import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig, syncDestination, targets } from '@adonisjs/core/logger'

/**
 * Logger configuration.
 * Defines how application logs are collected, formatted, and output.
 */
const loggerConfig = defineConfig({
  /**
   * The default logger to use for logging messages.
   */
  default: 'app',

  loggers: {
    /**
     * Application logger configuration.
     */
    app: {
      /**
       * Enable or disable this logger.
       */
      enabled: true,

      /**
       * Logger name that appears in log entries.
       * Useful for identifying the source of logs.
       */
      name: env.get('APP_NAME'),

      /**
       * Minimum log level to record.
       * Levels: trace, debug, info, warn, error, fatal
       */
      level: env.get('LOG_LEVEL'),

      /**
       * Synchronous destination for logs in development.
       * Ensures logs are written immediately for better debugging.
       * Disabled in production for better performance.
       */
      destination: !app.inProduction ? await syncDestination() : undefined,

      /**
       * Transport configuration defines where and how logs are sent.
       */
      transport: {
        /**
         * Targets define the output destinations for logs.
         * destination: 1 means stdout (console output).
         */
        targets: [targets.file({ destination: 1 })],
      },
    },
  },
})

export default loggerConfig

/**
 * Inferring types for the list of loggers you have configured
 * in your application.
 */
declare module '@adonisjs/core/types' {
  export interface LoggersList extends InferLoggers<typeof loggerConfig> {}
}
