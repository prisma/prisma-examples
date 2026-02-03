import { PrismaClient, Prisma, User } from '../src/generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const NUM_USERS = 1000
const COUNT_BLUE = 300

enum ExperimentVariant {
  BlueBuyButton = 'BlueBuyButton',
  GreenBuyButton = 'GreenBuyButton',
}

enum EventType {
  PageOpened = 'PageOpened',
  ProductPutInShoppingCart = 'ProductPutInShoppingCart',
  AddressFilled = 'AddressFilled',
  PaymentInfoFilled = 'PaymentInfoFilled',
  CheckedOut = 'CheckedOut',
}

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || 'file:./prisma/dev.db',
})
const prisma = new PrismaClient({ adapter })

async function main() {
  const usersInput: Prisma.UserCreateInput[] = []
  for (let i = 0; i < NUM_USERS; i++) {
    usersInput.push({
      email: `user${i}@example.com`,
    })
  }
  const users = await prisma.user.createManyAndReturn({ data: usersInput })
  await createFunnel(
    users.slice(0, COUNT_BLUE),
    ExperimentVariant.BlueBuyButton,
  )
  await createFunnel(users.slice(COUNT_BLUE), ExperimentVariant.GreenBuyButton)
}

async function createFunnel(users: User[], variant: ExperimentVariant) {
  for (const event of [
    EventType.PageOpened,
    EventType.ProductPutInShoppingCart,
    EventType.AddressFilled,
    EventType.AddressFilled,
    EventType.CheckedOut,
  ]) {
    await createEvents(users, variant, event)
    users = pickRandomSubset(users)
  }
}

function pickRandomSubset(users: User[]): User[] {
  let amount = 1 + Math.floor(Math.random() * (users.length - 1))
  const result: User[] = []
  while (amount > 0) {
    const idx = Math.floor(Math.random() * users.length)
    const user = users[idx]
    if (!result.includes(user)) {
      result.push(user)
      amount--
    }
  }
  return result
}

async function createEvents(
  users: User[],
  variant: ExperimentVariant,
  event: EventType,
) {
  const eventsData = users.map(
    (user) =>
    ({
      variant,
      type: event,
      userId: user.id,
    } satisfies Prisma.TrackingEventCreateManyInput),
  )
  await prisma.trackingEvent.createMany({ data: eventsData })
}

main()
