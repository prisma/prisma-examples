// The dashboard's four metrics. Each one is a single SQL query, computed in
// Postgres and typed with .returnsRow(). The SQL panel shows these same
// queries, read back with db.toSql(), so what you see is what runs.
//
// Amounts are in cents. Months are UTC. "Previous" values compare with 30
// days ago. For subscriptions and MRR, a subscription counts as active then
// if it was created before then and is active now or has ended since; with
// today's prices, so those are approximate.

import { getDb } from './prisma/db'

type Db = ReturnType<typeof getDb>

export type MetricKey = 'mrr' | 'subs' | 'rev30' | 'chart'

const returns = {
  mrr: { mrrCents: 'pg/int8number@1', previousCents: 'pg/int8number@1' },
  subs: { active: 'pg/int4@1', previous: 'pg/int4@1' },
  rev30: { revenueCents: 'pg/int8number@1', previousCents: 'pg/int8number@1', paidInvoices: 'pg/int4@1' },
  chart: { month: 'pg/text@1', revenueCents: 'pg/int8number@1' },
} as const

function buildQueries(db: Db) {
  return {
    mrr: db.raw.sql`
WITH items AS (
  SELECT s.status, s.created, s.ended_at,
         p.unit_amount * si.quantity
         * CASE p.recurring_interval
             WHEN 'day'   THEN 365.0 / 12
             WHEN 'week'  THEN 52.0 / 12
             WHEN 'month' THEN 1.0
             WHEN 'year'  THEN 1.0 / 12
           END
         / p.recurring_interval_count AS monthly
  FROM stripe_subscriptions s
  JOIN stripe_subscription_items si ON si.subscription = s.id
  JOIN stripe_prices p ON p.id = si.price_id
  WHERE p.type = 'recurring'
)
SELECT
  COALESCE(ROUND(SUM(monthly)
    FILTER (WHERE status = 'active')), 0)::int8 AS "mrrCents",
  COALESCE(ROUND(SUM(monthly)
    FILTER (WHERE created < now() - interval '30 days'
      AND (status = 'active'
        OR ended_at >= now() - interval '30 days'))), 0)::int8 AS "previousCents"
FROM items
`.returnsRow(returns.mrr).build(),

    subs: db.raw.sql`
SELECT
  count(*) FILTER (WHERE status = 'active')::int4 AS "active",
  count(*) FILTER (WHERE created < now() - interval '30 days'
    AND (status = 'active'
      OR ended_at >= now() - interval '30 days'))::int4 AS "previous"
FROM stripe_subscriptions
`.returnsRow(returns.subs).build(),

    rev30: db.raw.sql`
SELECT
  COALESCE(SUM(amount_paid)
    FILTER (WHERE created >= now() - interval '30 days'), 0)::int8 AS "revenueCents",
  COALESCE(SUM(amount_paid)
    FILTER (WHERE created < now() - interval '30 days'), 0)::int8 AS "previousCents",
  count(*) FILTER (WHERE created >= now() - interval '30 days')::int4 AS "paidInvoices"
FROM stripe_invoices
WHERE status = 'paid'
  AND created >= now() - interval '60 days'
`.returnsRow(returns.rev30).build(),

    chart: db.raw.sql`
SELECT
  to_char(m.month, 'YYYY-MM') AS "month",
  COALESCE(SUM(i.amount_paid), 0)::int8 AS "revenueCents"
FROM generate_series(
  date_trunc('month', now() AT TIME ZONE 'UTC') - interval '11 months',
  date_trunc('month', now() AT TIME ZONE 'UTC'),
  interval '1 month'
) AS m(month)
LEFT JOIN stripe_invoices i
  ON i.status = 'paid'
  AND i.created >= m.month AT TIME ZONE 'UTC'
  AND i.created < (m.month + interval '1 month') AT TIME ZONE 'UTC'
GROUP BY m.month
ORDER BY m.month
`.returnsRow(returns.chart).build(),
  }
}

/** Runs the four queries and returns their rows, plus each query's SQL and declared types for the SQL panel. */
export async function loadDashboard() {
  const db = getDb()
  const q = buildQueries(db)

  const [[mrr], [subs], [rev30], chart] = await Promise.all([
    db.query(q.mrr),
    db.query(q.subs),
    db.query(q.rev30),
    db.query(q.chart),
  ])
  if (!mrr || !subs || !rev30) throw new Error('A metric query returned no row')

  const sql = {
    mrr: db.toSql(q.mrr).sql.trim(),
    subs: db.toSql(q.subs).sql.trim(),
    rev30: db.toSql(q.rev30).sql.trim(),
    chart: db.toSql(q.chart).sql.trim(),
  } satisfies Record<MetricKey, string>

  return { mrr, subs, rev30, chart, sql, returns }
}

export type Dashboard = Awaited<ReturnType<typeof loadDashboard>>
