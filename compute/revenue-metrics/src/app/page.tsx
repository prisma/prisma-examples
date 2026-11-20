import { unstable_cache } from 'next/cache'

import { getDb } from '../prisma/db'
import { ensureSeeded } from '../prisma/seed'
import { loadDashboard, type MetricKey } from '../queries'
import { Dashboard, type Bar, type Card, type Panel } from './dashboard'

// Read the database per request, not at build time. The result is cached for
// 60 seconds, because Prisma Postgres bills per query and a busy demo page
// would otherwise run four queries on every visit.
export const dynamic = 'force-dynamic'

const getDashboard = unstable_cache(
  async () => {
    // A fresh database gets the demo data on the first visit.
    await ensureSeeded(getDb())
    return { ...(await loadDashboard()), loadedAt: new Date().toISOString() }
  },
  ['revenue-metrics-dashboard'],
  { revalidate: 60 },
)

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const usdShort = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

const dollars = (cents: number) => usd.format(cents / 100)

function tone(current: number, previous: number): Card['tone'] {
  if (current > previous) return 'up'
  if (current < previous) return 'down'
  return 'flat'
}

function percentChange(current: number, previous: number) {
  if (previous === 0) return current === 0 ? '0%' : 'New'
  const change = ((current - previous) / previous) * 100
  return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`
}

function monthName(month: string, format: 'short' | 'long') {
  const date = new Date(`${month}-01T00:00:00Z`)
  return format === 'short'
    ? date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
    : date.toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}

/** The .returnsRow() spec a query was built with, as the code reads. */
function returnsCode(spec: Record<string, string>) {
  const lines = Object.entries(spec).map(([column, codec]) => `  ${column}: '${codec}',`)
  return `.returnsRow({\n${lines.join('\n')}\n})`
}

export default async function Home() {
  const { mrr, subs, rev30, chart, sql, returns, loadedAt } = await getDashboard()

  const monthAgo = new Date(new Date(loadedAt).getTime() - 30 * 24 * 60 * 60 * 1000).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
  const subsChange = subs.active - subs.previous
  const cards: Card[] = [
    {
      key: 'mrr',
      label: 'MRR',
      value: dollars(mrr.mrrCents),
      delta: percentChange(mrr.mrrCents, mrr.previousCents),
      tone: tone(mrr.mrrCents, mrr.previousCents),
      sub: `vs ${dollars(mrr.previousCents)} on ${monthAgo}`,
    },
    {
      key: 'subs',
      label: 'Active subscriptions',
      value: subs.active.toLocaleString('en-US'),
      delta: `${subsChange > 0 ? '+' : ''}${subsChange}`,
      tone: tone(subs.active, subs.previous),
      sub: `${subs.previous.toLocaleString('en-US')} on ${monthAgo}`,
    },
    {
      key: 'rev30',
      label: 'Revenue, last 30 days',
      value: dollars(rev30.revenueCents),
      delta: percentChange(rev30.revenueCents, rev30.previousCents),
      tone: tone(rev30.revenueCents, rev30.previousCents),
      sub: `From ${rev30.paidInvoices.toLocaleString('en-US')} paid invoices`,
    },
  ]

  // The tallest bar is 200px; the rest scale to it.
  const max = Math.max(...chart.map((row) => row.revenueCents))
  const bars: Bar[] = chart.map((row, i) => ({
    // The current month is not over yet, so its label is marked "*".
    month: monthName(row.month, 'short') + (i === chart.length - 1 ? '*' : ''),
    label: usdShort.format(row.revenueCents / 100),
    height: max === 0 ? 0 : Math.round((row.revenueCents / max) * 200),
    current: i === chart.length - 1,
  }))
  const first = chart[0]
  const last = chart[chart.length - 1]
  const chartLabel =
    first && last
      ? `Bar chart of monthly revenue from paid invoices, from ${dollars(first.revenueCents)} in ${monthName(first.month, 'long')} to ${dollars(last.revenueCents)} so far in ${monthName(last.month, 'long')}`
      : 'Bar chart of monthly revenue from paid invoices'

  const panels: Record<MetricKey, Panel> = {
    mrr: {
      title: 'MRR',
      sql: sql.mrr,
      returns: returnsCode(returns.mrr),
      note: 'Reads stripe_subscriptions, stripe_subscription_items and stripe_prices. Monthly recurring revenue from active subscriptions, with each price converted to a monthly amount. Discounts are not applied. The previous value uses today’s prices, so it is approximate.',
    },
    subs: {
      title: 'Active subscriptions',
      sql: sql.subs,
      returns: returnsCode(returns.subs),
      note: 'Reads stripe_subscriptions. Subscriptions with status active; trialing and past_due are left out. The previous value counts subscriptions created before 30 days ago that are active now or have ended since.',
    },
    rev30: {
      title: 'Revenue, last 30 days',
      sql: sql.rev30,
      returns: returnsCode(returns.rev30),
      note: 'Reads stripe_invoices. Cash from paid invoices created in the last 30 days, compared with the 30 days before.',
    },
    chart: {
      title: 'Revenue by month',
      sql: sql.chart,
      returns: returnsCode(returns.chart),
      note: 'Reads stripe_invoices. Paid invoices grouped by the month they were created, in UTC. Months with no invoices show as $0.',
    },
  }

  const updated = new Date(loadedAt).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  })

  return (
    <div className="page">
      <header className="header">
        <div>
          <div className="title">
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2448C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="M7 15l4-4 3 3 5-6" />
            </svg>
            <h1>Revenue Metrics</h1>
          </div>
          <p className="subtitle">Stripe billing data in Prisma Postgres. Amounts in USD.</p>
        </div>
        <span className="pill">
          <span className="dot" />
          Updated {updated} UTC
        </span>
      </header>

      <details className="how">
        <summary>How it works: where the data and SQL come from</summary>
        <ol className="steps">
          <li>
            <strong>Data</strong>
            Stripe-shaped tables in Prisma Postgres: <code>stripe_subscriptions</code>,{' '}
            <code>stripe_subscription_items</code>, <code>stripe_prices</code> and <code>stripe_invoices</code>. An
            empty database gets demo data on the first visit, or you can sync your own Stripe data into the same
            tables with{' '}
            <a href="https://www.prisma.io/docs/guides/integrations/codeless-sync">Codeless Sync</a>.
          </li>
          <li>
            <strong>Query</strong>
            Each card is one SQL query in <code>src/queries.ts</code>, computed in Postgres and typed with{' '}
            <code>.returnsRow()</code>. View SQL shows the query that ran.
          </li>
          <li>
            <strong>Deploy</strong>
            The app runs on Prisma Compute, which provisions the database and connects it. Results are cached for 60
            seconds, so a visit does not always re-run the queries.
          </li>
        </ol>
      </details>

      <Dashboard cards={cards} bars={bars} chartLabel={chartLabel} panels={panels} />

      <footer className="footer">
        <strong>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2448C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="8" ry="3" />
            <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
            <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
          </svg>
          Each metric = one typed SQL query
        </strong>
        <span>Computed in Postgres, typed end to end with Prisma ORM 8. Built on Prisma Postgres, deployed to Prisma Compute.</span>
      </footer>
    </div>
  )
}
