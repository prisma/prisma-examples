import { getDb } from './db'

const db = getDb()

// A small USD data set whose metrics can be checked by hand. Dates are
// relative to now, so the dashboard always shows the last 12 months.
//
//   MRR                  $10 + $25 x 2 + $240 / 12 = $80
//   Active subscriptions 3 (past_due and canceled are left out)
//   Revenue, 30 days     $10 + $50 = $60 (the past_due sub's latest invoice is open)

const DAY = 24 * 60 * 60 * 1000
const now = Date.now()
const daysAgo = (days: number) => new Date(now - days * DAY)

const prices = [
  { id: 'price_seed_basic', unit_amount: 1000, recurring_interval: 'month' },
  { id: 'price_seed_team', unit_amount: 2500, recurring_interval: 'month' },
  { id: 'price_seed_annual', unit_amount: 24000, recurring_interval: 'year' },
].map((price) => ({
  ...price,
  product: price.id.replace('price_', 'prod_'),
  currency: 'usd',
  type: 'recurring',
  recurring_interval_count: 1,
  livemode: false,
  created: daysAgo(400),
}))

const plans = [
  { status: 'active', price: 'price_seed_basic', quantity: 1 },
  { status: 'active', price: 'price_seed_team', quantity: 2 },
  { status: 'active', price: 'price_seed_annual', quantity: 1 },
  { status: 'past_due', price: 'price_seed_basic', quantity: 1 },
  { status: 'canceled', price: 'price_seed_team', quantity: 1 },
]

const subscriptions = plans.map((plan, i) => ({
  id: `sub_seed_${i + 1}`,
  customer: `cus_seed_${i + 1}`,
  status: plan.status,
  currency: 'usd',
  livemode: false,
  created: daysAgo(390),
  canceled_at: plan.status === 'canceled' ? daysAgo(100) : null,
  ended_at: plan.status === 'canceled' ? daysAgo(100) : null,
}))

const items = plans.map((plan, i) => ({
  id: `si_seed_${i + 1}`,
  subscription: `sub_seed_${i + 1}`,
  price_id: plan.price,
  product_id: plan.price.replace('price_', 'prod_'),
  quantity: plan.quantity,
  livemode: false,
  created: daysAgo(390),
}))

type Invoice = {
  id: string
  customer: string
  status: string
  total: number
  amount_paid: number
  amount_due: number
  currency: string
  livemode: boolean
  created: Date
}

const invoices: Invoice[] = []

function addInvoice(sub: number, amount: number, days: number, status = 'paid') {
  invoices.push({
    id: `in_seed_${invoices.length + 1}`,
    customer: `cus_seed_${sub}`,
    status,
    total: amount,
    amount_paid: status === 'paid' ? amount : 0,
    amount_due: amount,
    currency: 'usd',
    livemode: false,
    created: daysAgo(days),
  })
}

// Monthly plans bill every 30 days, the latest 15 days ago, back about 13 months.
for (let i = 0; i <= 12; i++) {
  const days = 15 + 30 * i
  addInvoice(1, 1000, days)
  addInvoice(2, 5000, days)
  addInvoice(4, 1000, days, i === 0 ? 'open' : 'paid')
  if (days > 100) addInvoice(5, 2500, days)
}
addInvoice(3, 24000, 100)

async function main() {
  // Replace only the seed rows, so a re-run refreshes the dates and leaves
  // any other rows (such as synced Stripe data) alone.
  await db.transaction(async (tx) => {
    const t = tx.orm.public
    const ids = (rows: { id: string }[]) => rows.map((row) => row.id)
    await t.StripePrice.where((r) => r.id.in(ids(prices))).deleteAll()
    await t.StripeSubscription.where((r) => r.id.in(ids(subscriptions))).deleteAll()
    await t.StripeSubscriptionItem.where((r) => r.id.in(ids(items))).deleteAll()
    await t.StripeInvoice.where((r) => r.id.in(ids(invoices))).deleteAll()

    await t.StripePrice.createAll(prices)
    await t.StripeSubscription.createAll(subscriptions)
    await t.StripeSubscriptionItem.createAll(items)
    await t.StripeInvoice.createAll(invoices)
  })
  console.log(`Seeded ${subscriptions.length} subscriptions and ${invoices.length} invoices.`)
}

main()
  .then(() => db.close())
  .catch(async (error) => {
    console.error(error)
    await db.close()
    process.exit(1)
  })
