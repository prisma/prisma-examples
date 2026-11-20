import type { getDb } from './db'

type Db = ReturnType<typeof getDb>

// Demo billing data: about 800 subscriptions started over the last two
// years, growing month by month, with some churn and a few past_due. The
// random numbers come from a fixed seed, so every run makes the same data;
// dates are relative to now, so the chart always shows the last 12 months.
//
// Every demo row's id contains "_seed_", so the demo data can be replaced or
// removed without touching other rows, such as Stripe data synced with
// Codeless Sync.

const DAY = 24 * 60 * 60 * 1000
const SUBSCRIPTIONS = 800
const BATCH = 1000

// mulberry32: a tiny seeded random number generator.
function seededRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const plans = [
  { id: 'price_seed_basic', unit_amount: 2900, interval: 'month', days: 30 },
  { id: 'price_seed_team', unit_amount: 4900, interval: 'month', days: 30 },
  { id: 'price_seed_annual', unit_amount: 79000, interval: 'year', days: 365 },
] as const

function buildDemoData() {
  const random = seededRandom(42)
  const now = Date.now()
  const at = (time: number) => new Date(time)
  const windowStart = now - 400 * DAY // invoices older than this are not shown

  const prices = plans.map((plan) => ({
    id: plan.id,
    product: plan.id.replace('price_', 'prod_'),
    currency: 'usd',
    unit_amount: plan.unit_amount,
    type: 'recurring',
    recurring_interval: plan.interval,
    recurring_interval_count: 1,
    livemode: false,
    created: at(now - 800 * DAY),
  }))

  const subscriptions = []
  const items = []
  const invoices = []

  for (let n = 1; n <= SUBSCRIPTIONS; n++) {
    const id = String(n).padStart(4, '0')

    // 40% started before the chart's window, the rest at a rising rate inside it.
    const daysAgo = random() < 0.4 ? 400 + random() * 300 : 395 * (1 - Math.sqrt(random()))
    const created = now - daysAgo * DAY

    const pick = random()
    const plan = pick < 0.5 ? plans[0] : pick < 0.8 ? plans[1] : plans[2]
    const quantity = plan.id === 'price_seed_team' ? 1 + Math.floor(random() * 4) : 1

    const canceled = random() < 0.25
    const endedAt = canceled ? created + random() * (now - created) : null
    const pastDue = !canceled && random() < 0.03
    const status = canceled ? 'canceled' : pastDue ? 'past_due' : 'active'

    subscriptions.push({
      id: `sub_seed_${id}`,
      customer: `cus_seed_${id}`,
      status,
      currency: 'usd',
      livemode: false,
      created: at(created),
      canceled_at: endedAt === null ? null : at(endedAt),
      ended_at: endedAt === null ? null : at(endedAt),
    })

    items.push({
      id: `si_seed_${id}`,
      subscription: `sub_seed_${id}`,
      price_id: plan.id,
      product_id: plan.id.replace('price_', 'prod_'),
      quantity,
      livemode: false,
      created: at(created),
    })

    // One invoice per billing period, from the start date until it ended or now.
    const amount = plan.unit_amount * quantity
    const until = endedAt ?? now
    const periods = []
    for (let time = created; time <= until; time += plan.days * DAY) {
      if (time >= windowStart) periods.push(time)
    }
    for (const [i, time] of periods.entries()) {
      // A past_due subscription's latest invoice is still open.
      const open = pastDue && i === periods.length - 1
      invoices.push({
        id: `in_seed_${id}_${String(i + 1).padStart(2, '0')}`,
        customer: `cus_seed_${id}`,
        status: open ? 'open' : 'paid',
        total: amount,
        amount_paid: open ? 0 : amount,
        amount_due: amount,
        currency: 'usd',
        livemode: false,
        created: at(time),
      })
    }
  }

  return { prices, subscriptions, items, invoices }
}

function inBatches<T>(rows: T[]) {
  const batches: T[][] = []
  for (let i = 0; i < rows.length; i += BATCH) batches.push(rows.slice(i, i + BATCH))
  return batches
}

type Tables = Db['orm']['public']

// In LIKE, _ matches any character, so it is escaped to match only "_".
const DEMO_ID = '%\\_seed\\_%'

async function deleteDemoRows(t: Tables) {
  await t.StripeInvoice.where((r) => r.id.like(DEMO_ID)).deleteAll()
  await t.StripeSubscriptionItem.where((r) => r.id.like(DEMO_ID)).deleteAll()
  await t.StripeSubscription.where((r) => r.id.like(DEMO_ID)).deleteAll()
  await t.StripePrice.where((r) => r.id.like(DEMO_ID)).deleteAll()
}

/** Deletes every demo row (ids containing "_seed_") and leaves all other rows alone. */
export async function removeDemoData(db: Db) {
  await db.transaction((tx) => deleteDemoRows(tx.orm.public))
}

/** Replaces the demo rows with a fresh set, in one transaction. Returns the row counts. */
export async function seedDemoData(db: Db) {
  const data = buildDemoData()
  await db.transaction(async (tx) => {
    const t = tx.orm.public
    await deleteDemoRows(t)

    await t.StripePrice.createAll(data.prices)
    for (const batch of inBatches(data.subscriptions)) await t.StripeSubscription.createAll(batch)
    for (const batch of inBatches(data.items)) await t.StripeSubscriptionItem.createAll(batch)
    for (const batch of inBatches(data.invoices)) await t.StripeInvoice.createAll(batch)
  })
  return { subscriptions: data.subscriptions.length, invoices: data.invoices.length }
}

let seeding: Promise<void> | undefined

/** Seeds an empty database on the first call in this server process, so a fresh deploy shows data. */
export function ensureSeeded(db: Db) {
  seeding ??= (async () => {
    const existing = await db.orm.public.StripeSubscription.first()
    if (!existing) await seedDemoData(db)
  })().catch((error: unknown) => {
    seeding = undefined // try again on the next request
    throw error
  })
  return seeding
}
