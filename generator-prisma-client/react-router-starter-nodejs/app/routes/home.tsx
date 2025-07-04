import { Await } from 'react-router'
import { Suspense } from 'react'
import { Quotes } from '~/components/quotes'
import { QuotesLoading } from '~/components/quotes-loading'
import { DisplayPrismaEnums } from '~/components/display-prisma-enums'
import type { Route } from "./+types/home";
import prisma from '~/db'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const quotes = await prisma.quotes.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return { quotes }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 md:p-24 bg-white dark:bg-slate-900">
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
          Stack: React Router, Vite, Node.js<pre className="inlin-block">prisma-client</pre>
        </h1>

        <p className="text-xl text-slate-600 dark:text-slate-300">
          A collection of inspiring opinions and fascinating facts
        </p>
      </div>
      <div className="text-center mb-12">
        <DisplayPrismaEnums />
      </div>

      <Suspense fallback={<QuotesLoading />}>
        <Await resolve={loaderData.quotes}>
          {(quotes) => <Quotes quotes={quotes} />}
        </Await>
      </Suspense>
    </main>
  )
}
