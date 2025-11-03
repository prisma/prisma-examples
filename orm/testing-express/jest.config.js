import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: 'ts-jest/presets/default-esm',
  moduleFileExtensions: ['js', 'json', 'ts', 'mjs'],
  testEnvironment: join(__dirname, 'prisma', 'prisma-test-environment.mjs'),
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
}

export default config
