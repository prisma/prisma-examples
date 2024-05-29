import 'dotenv/config'
import { PrismaClient, User } from '@prisma/client'
import { withPulse } from '@prisma/extension-pulse'
import { BigQuery } from '@google-cloud/bigquery'

const DATASET_ID = 'pulse_demo'
const TABLE_ID = 'users'

const bigquery = new BigQuery()

const apiKey: string = process.env.PULSE_API_KEY ?? ''
const prisma = new PrismaClient().$extends(withPulse({ apiKey: apiKey }))

async function main() {

  // Setup
  await createDataset()
  await createTable()

  // Start streaming database change events with Pulse
  const stream = await prisma.user.stream({
    create: {},
    name: 'all-create-events'
  })

  process.on('exit', (code) => {
    stream.stop()
  })

  for await (const event of stream) {
    console.log('Just received an event:', event)
    const user: User = event.created
    syncData(user)
  }
}



async function syncData(user: User) {
  try {
    // Insert data into the table
    await bigquery.dataset(DATASET_ID).table(TABLE_ID).insert([user])
    console.log(
      `Inserted user with email '${user.email}' into '${DATASET_ID}.${TABLE_ID}'`,
    )
  } catch (err) {
    console.error('Error inserting rows:', err)
  }
}

async function createDataset() {
  // Check if the dataset exists
  const [datasets] = await bigquery.getDatasets()
  const datasetExists = datasets.some((dataset) => dataset.id === DATASET_ID)

  if (!datasetExists) {
    // Create the dataset
    const [dataset] = await bigquery.createDataset(DATASET_ID)
    console.log(`Dataset '${dataset.id}' created.`)
  } else {
    console.log(`Dataset '${DATASET_ID}' already exists.`)
  }
}

// Function to create a new table
async function createTable() {
  const dataset = bigquery.dataset(DATASET_ID)

  // Check if the table exists
  const [tables] = await dataset.getTables()
  const tableExists = tables.some((table) => table.id === TABLE_ID)

  if (!tableExists) {
    // Define the schema for the new table
    const schema = [
      { name: 'id', type: 'INTEGER', mode: 'REQUIRED' },
      { name: 'name', type: 'STRING', mode: 'NULLABLE' },
      { name: 'email', type: 'STRING', mode: 'REQUIRED' },
    ]

    // Create the table
    const [table] = await dataset.createTable(TABLE_ID, { schema })
    console.log(`Table '${table.id}' created.`)
  } else {
    console.log(`Table '${TABLE_ID}' already exists.`)
  }
}

main()
