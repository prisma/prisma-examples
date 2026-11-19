import { unstable_cache } from 'next/cache'

import { loadDashboard } from '../queries'

// Read the database per request, not at build time. The result is cached for
// 60 seconds, because Prisma Postgres bills per query and a busy demo page
// would otherwise run four queries on every visit.
export const dynamic = 'force-dynamic'

const getDashboard = unstable_cache(
  async () => ({ ...(await loadDashboard()), loadedAt: new Date().toISOString() }),
  ['revenue-metrics-dashboard'],
  { revalidate: 60 },
)

export default async function Home() {
  const data = await getDashboard()

  return (
    <main>
      <h1>Revenue Metrics</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}
