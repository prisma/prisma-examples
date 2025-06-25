import { QuoteKind } from '../prisma-enums'

export type Quote = {
  id: number
  quote: string
  createdAt: string
  kind: QuoteKind
}

export type QuoteResult = {
  data: Quote
}
