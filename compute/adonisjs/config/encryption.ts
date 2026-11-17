import env from '#start/env'
import { defineConfig, drivers } from '@adonisjs/core/encryption'

/**
 * Encryption configuration.
 * Defines encryption methods used for securing sensitive data like
 * cookies, session data, and other encrypted values.
 */
const encryptionConfig = defineConfig({
  /**
   * The default encryption driver to use.
   */
  default: 'gcm',

  /**
   * List of available encryptors and their configuration.
   */
  list: {
    /**
     * AES-256-GCM encryption driver.
     * GCM (Galois/Counter Mode) provides both encryption and authentication,
     * making it secure against tampering.
     */
    gcm: drivers.aes256gcm({
      /**
       * Encryption keys used for encrypting and decrypting data.
       * Multiple keys can be provided for key rotation.
       * The first key is used for encryption, all keys are tried for decryption.
       */
      keys: [env.get('APP_KEY')],

      /**
       * Unique identifier for this encryption driver.
       * Used when multiple encryption methods are configured.
       */
      id: 'gcm',
    }),
  },
})

export default encryptionConfig

/**
 * Inferring types for the list of encryptors you have configured
 * in your application.
 */
declare module '@adonisjs/core/types' {
  export interface EncryptorsList extends InferEncryptors<typeof encryptionConfig> {}
}
