import { Quote } from "@/components/Quote/Quote";
import { QuoteResult } from "@/lib/types";
import { HOST } from "@/lib/utils/helpers";

const loadData = async (url: string): Promise<QuoteResult> => {
  const { signal } = new AbortController();
  const result = await fetch(url, {
    cache: "no-cache",
    signal: signal,
  });
  const data = await result.json();
  return data;
};

const getQuotes = async () => {
  const data = await Promise.all([
    loadData(`${HOST}/api?cache=TTL`),
    loadData(`${HOST}/api?cache=SWR`),
    loadData(`${HOST}/api?cache=BOTH`),
    loadData(`${HOST}/api?cache=NONE`),
  ]);

  return data;
};

export async function Quotes() {
  const [ttl, swr, both, none] = await getQuotes();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Quote title="Cached Quote" type="TTL" result={ttl}></Quote>
      <Quote title="Cached Quote" type="SWR" result={swr}></Quote>
      <Quote title="Cached Quote" type="TTL + SWR" result={both}></Quote>
      <Quote title="Quote" type="No caching" result={none}></Quote>
    </div>
  );
}
