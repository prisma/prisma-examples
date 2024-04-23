import { AddQuote } from '@/components/Quote/AddQuote'
import { QuotesLoading } from '@/components/Quote/QuotesLoading'
import { Quotes } from '@/components/Quote/Quotes'
import { Suspense } from 'react'

// Caching is disabled to opt-out of the Next.js Data Cache for a specific route using the "force-dynamic" config option so that up to date data is always returned and no caching happens. Learn more here: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dynamic.
export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 md:p-24">
      <h1 className="text-3xl text-slate-800 dark:text-white">
        Accelerated Quotes
      </h1>
      <br />
      <p className="text-xl text-slate-800 dark:text-slate-200">
        Retrieves the most recently added quote with and without caching enabled
      </p>
      <br />
      <AddQuote />
      <br />
      <Suspense fallback={<QuotesLoading />}>
        <Quotes />
      </Suspense>
    </main>
  )
}
