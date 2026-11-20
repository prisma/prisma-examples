// bun run db:seed            replace the demo rows with a fresh set
// bun run db:seed --remove   delete the demo rows, keep every other row
//
// Demo rows are the ones whose id contains "_seed_". Reads DATABASE_URL from .env.
import { getDb } from './db'
import { removeDemoData, seedDemoData } from './seed'

const db = getDb()

async function main() {
  if (process.argv.includes('--remove')) {
    await removeDemoData(db)
    console.log('Removed the demo data.')
    return
  }
  const counts = await seedDemoData(db)
  console.log(`Seeded ${counts.subscriptions} subscriptions and ${counts.invoices} invoices.`)
}

main()
  .then(() => db.close())
  .catch(async (error) => {
    console.error(error)
    await db.close()
    process.exit(1)
  })
