// app/routes/index.tsx
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Quotes from "../components/Quote/Quotes";
import { RefreshQuote } from "../components/Quote/RefreshQuote";
import { QuoteResult } from "~/lib/types";
import { getQuotesFromDB } from "../data/quotes.server";

const getQuotes = async () => {
  const ttl = await getQuotesFromDB("TTL");
  const swr = await getQuotesFromDB("SWR");
  const both = await getQuotesFromDB("BOTH");
  const none = await getQuotesFromDB("NONE");

  return [ttl, swr, both, none];
};

export const loader: LoaderFunction = async () => {
  const [ttl, swr, both, none] = await getQuotes();
  return json({ ttl, swr, both, none });
};

export default function Index() {
  const { ttl, swr, both, none } = useLoaderData<{
    ttl: QuoteResult;
    swr: QuoteResult;
    both: QuoteResult;
    none: QuoteResult;
  }>();

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
      <br />
      <RefreshQuote />
      <br />
      <Quotes ttl={ttl} swr={swr} both={both} none={none} />
    </main>
  );
}
