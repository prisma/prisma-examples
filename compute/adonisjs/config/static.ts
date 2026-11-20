import { defineConfig } from '@adonisjs/static'

/**
 * Configuration options to tweak the static files middleware.
 * The complete set of options are documented on the
 * official documentation website.
 *
 * https://docs.adonisjs.com/guides/basics/static-file-server
 */
const staticServerConfig = defineConfig({
  /**
   * Enable or disable static file serving middleware.
   */
  enabled: true,

  /**
   * Generate ETag headers for client/proxy caching.
   */
  etag: true,

  /**
   * Include Last-Modified headers for conditional requests.
   */
  lastModified: true,

  /**
   * Policy for files starting with a dot.
   */
  dotFiles: 'ignore',
})

export default staticServerConfig
