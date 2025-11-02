const NodeEnvironment = require('jest-environment-node').default
const randomString = require('randomstring')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { PrismaClient } = require('./generated/client')
const { PrismaPg } = require('@prisma/adapter-pg')

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)

    // Generate a unique database identifier for this test context
    this.databaseName = `test_${randomString.generate({
      length: 16,
      charset: 'alphanumeric',
      capitalization: 'lowercase',
    })}`

    // Generate the pg connection string for the test database
    this.databaseUrl = `postgres://postgres:password@localhost:5432/${this.databaseName}`

    // Set the environment variable early so imports use the correct URL
    process.env.DB_URL = this.databaseUrl
    this.global.process.env.DB_URL = this.databaseUrl
  }

  async setup() {
    // Connect to the default postgres database to create the test database
    const adminUrl = 'postgres://postgres:password@localhost:5432/postgres'
    const adminAdapter = new PrismaPg({ connectionString: adminUrl })
    const adminClient = new PrismaClient({ adapter: adminAdapter })

    // Create the test database
    await adminClient.$executeRawUnsafe(`CREATE DATABASE "${this.databaseName}"`)
    await adminClient.$disconnect()

    // Create the client for the test database
    const adapter = new PrismaPg({ connectionString: this.databaseUrl })
    this.client = new PrismaClient({ adapter })

    // Ensure PostGIS extension exists
    await this.client.$executeRawUnsafe(`CREATE EXTENSION IF NOT EXISTS postgis`)

    // Run migrations before the tests start
    const { stdout, stderr } = await exec('npx prisma migrate deploy')
    if (stderr && !stderr.includes('warn')) {
      console.error('Migration error:', stderr)
    }
    if (stdout) {
      console.log('Migration output:', stdout)
    }

    return super.setup()
  }

  async teardown() {
    // Drop the database after the tests have completed
    if (this.client) {
      await this.client.$disconnect()
    }

    // Connect to the default postgres database to drop the test database
    const adminUrl = 'postgres://postgres:password@localhost:5432/postgres'
    const adminAdapter = new PrismaPg({ connectionString: adminUrl })
    const adminClient = new PrismaClient({ adapter: adminAdapter })
    await adminClient.$executeRawUnsafe(`DROP DATABASE IF EXISTS "${this.databaseName}"`)
    await adminClient.$disconnect()
  }
}

module.exports = PrismaTestEnvironment
