// @ts-check
import path from 'path'
import fs from 'fs'
import { nanoid } from 'nanoid'
import { TestEnvironment } from 'jest-environment-node'
import { exec } from 'child_process'
import { promisify } from 'util'
import { fileURLToPath } from 'url'
import "dotenv/config"

const execAsync = promisify(exec)

// fix for 'How to fix "__dirname is not defined in ES module scope"'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const prismaBinary = path.join(
  __dirname,
  '..',
  'node_modules',
  '.bin',
  'prisma',
)

class PrismaTestEnvironment extends TestEnvironment {
  /** @type {import('@jest/types').Config.ProjectConfig} */

  constructor(config, _context) {
    super(config, _context)

    // Generate a unique database file for this test context
    this.dbName = `test_${nanoid()}.db`
    const dbUrl = `file:${this.dbName}`
    process.env.DATABASE_URL = dbUrl
    this.global.process.env.DATABASE_URL = dbUrl
    this.dbPath = path.join(__dirname, this.dbName)
  }

  async setup() {
    // Run the migrations to ensure our schema has the required structure
    await execAsync(`${prismaBinary} db push --skip-generate`)
    return super.setup()
  }

  async teardown() {
    // Clean up the test database file
    try {
      await fs.promises.unlink(this.dbPath)
    } catch (error) {
      // doesn't matter as the environment is torn down
    }
  }
}

export default PrismaTestEnvironment
