import { json } from "@solidjs/router";
import { z } from 'zod';
import { getQuotes } from '../../lib/utils/query';
import type { APIEvent } from "@solidjs/start/server";
import type { QuoteResult, CacheStrategy, QuoteCacheType } from '../../types';

const cacheStrategies: Record<QuoteCacheType, CacheStrategy | undefined> = {
  'SWR': { swr: 30 },
  'TTL': { ttl: 30 },
  'NO CACHING': undefined,
  'TTL + SWR': { ttl: 30, swr: 60 },
};

export async function GET({ request }: APIEvent) {
  const url = new URL(request.url);
  const cache = decodeURIComponent(url.searchParams.get('cache') || '') as QuoteCacheType;

  const parser = z.enum(["TTL", "SWR", "TTL + SWR", "NO CACHING"]);
  const parsedOutput = parser.safeParse(cache);

  if (!parsedOutput.success) {
    return json({ error: 'Invalid search parameter.' }, { status: 400 });
  }

  const cacheType: QuoteCacheType = parsedOutput.data;
  const cacheStrategy = cacheStrategies[cacheType];

  if (cacheStrategy === undefined && cacheType !== 'NO CACHING') {
    return json({ error: 'Invalid cache strategy.' }, { status: 400 });
  }

  const data = await getQuotes(cacheStrategy);

  return json(data);
}
