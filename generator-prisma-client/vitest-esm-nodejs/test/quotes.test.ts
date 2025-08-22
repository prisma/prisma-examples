import { describe, it, expect, beforeEach } from 'vitest'
import { getDb } from '../src/db'
import { QuoteKind } from '../src/generated/prisma/client'

describe('Quotes', () => {
  // Note: `file:./` refers is relative to the root of the project (__dirname in cjs), not to this file.
  const prisma = getDb({ connectionString: 'file:./prisma/dev.db' })

  beforeEach(async () => {
    await prisma.quotes.deleteMany({})
  })

  it('should create a quote', async () => {
    const quote = await prisma.quotes.create({
      data: {
        quote: 'The only way to do great work is to love what you do.',
        kind: QuoteKind.Opinion,
      },
    })

    expect(quote).toMatchObject({
      id: expect.any(Number),
      quote: 'The only way to do great work is to love what you do.',
      kind: QuoteKind.Opinion,
      createdAt: expect.any(Date),
    })
  })

  it('should find quotes by kind', async () => {
    await prisma.quotes.createMany({
      data: [
        { quote: 'Fact quote', kind: QuoteKind.Fact },
        { quote: 'Opinion quote', kind: QuoteKind.Opinion },
      ],
    })

    const factQuotes = await prisma.quotes.findMany({
      where: { kind: QuoteKind.Fact },
    })

    expect(factQuotes).toHaveLength(1)
    expect(factQuotes[0].quote).toBe('Fact quote')
  })

  it('should count total quotes', async () => {
    await prisma.quotes.createMany({
      data: [
        { quote: 'Quote 1' },
        { quote: 'Quote 2' },
        { quote: 'Quote 3' },
      ],
    })

    const count = await prisma.quotes.count()
    expect(count).toBe(3)
  })
})
