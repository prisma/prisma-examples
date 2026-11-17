import { defineConfig } from '@adonisjs/core/bodyparser'

/**
 * Body parser configuration.
 * Defines how request bodies are parsed for different content types
 * including forms, JSON, and file uploads.
 */
const bodyParserConfig = defineConfig({
  /**
   * The bodyparser middleware will parse the request body
   * for the following HTTP methods.
   */
  allowedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],

  /**
   * Config for the "application/x-www-form-urlencoded"
   * content-type parser
   */
  form: {
    /**
     * Convert empty strings to null values.
     * Helps maintain consistent data types in your application.
     */
    convertEmptyStringsToNull: true,

    /**
     * Automatically trim whitespace from the start and end of string values.
     */
    trimWhitespaces: true,

    /**
     * Content types that should be parsed as form data.
     */
    types: ['application/x-www-form-urlencoded'],
  },

  /**
   * Config for the JSON parser
   */
  json: {
    /**
     * Convert empty strings to null values.
     * Helps maintain consistent data types in your application.
     */
    convertEmptyStringsToNull: true,

    /**
     * Automatically trim whitespace from the start and end of string values.
     */
    trimWhitespaces: true,

    /**
     * Content types that should be parsed as JSON.
     * Includes standard JSON and various JSON-based API formats.
     */
    types: [
      'application/json',
      'application/json-patch+json',
      'application/vnd.api+json',
      'application/csp-report',
    ],
  },

  /**
   * Config for the "multipart/form-data" content-type parser.
   * File uploads are handled by the multipart parser.
   */
  multipart: {
    /**
     * Enabling auto process allows bodyparser middleware to
     * move all uploaded files inside the tmp folder of your
     * operating system
     */
    autoProcess: true,

    /**
     * Convert empty strings to null values.
     * Helps maintain consistent data types in your application.
     */
    convertEmptyStringsToNull: true,

    /**
     * Automatically trim whitespace from the start and end of string values.
     */
    trimWhitespaces: true,

    /**
     * Routes where file uploads should be processed manually.
     * Useful when you need custom file handling logic.
     */
    processManually: [],

    /**
     * Maximum limit of data to parse including all files
     * and fields
     */
    limit: '20mb',

    /**
     * Content types that should be parsed as multipart form data.
     */
    types: ['multipart/form-data'],
  },
})

export default bodyParserConfig
