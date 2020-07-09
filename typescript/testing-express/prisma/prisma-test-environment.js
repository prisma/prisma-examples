// @ts-check
const path = require('path')
const fs = require('fs')
const util = require('util')
const NodeEnvironment = require('jest-environment-node')
const { nanoid } = require('nanoid')
const exec = util.promisify(require('child_process').exec)

const prismaBinary = path.join(
  __dirname,
  '..',
  'node_modules',
  '.bin',
  'prisma'
)

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)

    // Generate a unique sqlite identifier for this test context
    this.dbName = `test_${nanoid()}.db`
    process.env.DB_URL = `file:${this.dbName}`
    this.global.process.env.DB_URL = `file:${this.dbName}`
    this.dbPath = path.join(__dirname, this.dbName)
  }

  async setup() {
    // Run the migrations to ensure our schema has the required structure
    await exec(`${prismaBinary} migrate up --create-db --experimental`)
    return super.setup()
  }

  async teardown() {
    await fs.promises.unlink(this.dbPath)
  }
}

module.exports = PrismaTestEnvironment
