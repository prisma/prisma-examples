// app/components/Quotes.tsx
import { Quote } from "./Quote";
import { QuoteResult } from "~/lib/types";

interface QuotesProps {
  ttl: QuoteResult;
  swr: QuoteResult;
  both: QuoteResult;
  none: QuoteResult;
}

export default function Quotes({ ttl, swr, both, none }: QuotesProps) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Quote title="Cached Quote" type="TTL" result={ttl}></Quote>
      <Quote title="Cached Quote" type="SWR" result={swr}></Quote>
      <Quote title="Cached Quote" type="TTL + SWR" result={both}></Quote>
      <Quote title="Quote" type="No caching" result={none}></Quote>
    </div>
  );
}
