import { PrismaClient } from '@prisma/client'
import { join } from 'path'
import * as fs from 'fs'

const prisma = new PrismaClient()

async function seed() {
  const sql = await generateSQL()
  for (let statement of sql) {
    await prisma.executeRaw(statement)
  }
}

seed()
  .catch(console.error)
  .finally(async () => {
    await prisma.disconnect()
  })

async function generateSQL() {
  const file = await fs.promises.readFile(join(__dirname, 'seed.sql'))
  return file
    .toString()
    .split('\n')
    .filter((line) => line.indexOf('--') !== 0)
    .join('\n')
    .replace(/(\r\n|\n|\r)/gm, ' ')
    .replace(/\s+/g, ' ')
    .split(';')
    .map((sql) => sql.trim())
    .filter(Boolean)
}
