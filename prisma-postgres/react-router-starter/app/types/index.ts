import type { QuoteKind } from '~/prisma-enums'

export type Quote = {
  id: number
  quote: string
  createdAt: Date
  kind: QuoteKind
}

export type QuoteResult = {
  data: Quote
}
