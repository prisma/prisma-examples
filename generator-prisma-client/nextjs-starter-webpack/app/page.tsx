import { Suspense } from 'react'
import { Quotes } from '@/components/quotes'
import { QuotesLoading } from '@/components/quotes-loading'
import { DisplayPrismaEnums } from '@/components/display-prisma-enums'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 md:p-24 bg-white dark:bg-slate-900">
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
          Using: Next.js 15, Webpack, Node.js, <pre className="inline-block">prisma-client</pre>
        </h1>

        <p className="text-xl text-slate-600 dark:text-slate-300">
          Quotes: A collection of inspiring opinions and fascinating facts
        </p>
      </div>
      <div className="text-center mb-12">
        <DisplayPrismaEnums />
      </div>

      <Suspense fallback={<QuotesLoading />}>
        <Quotes />
      </Suspense>
    </main>
  )
}
