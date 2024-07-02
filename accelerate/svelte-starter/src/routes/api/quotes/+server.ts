import { json } from '@sveltejs/kit';
import { z } from 'zod';
import { getQuotes } from '$lib/utils/query';

// Import types from your custom types file
import type { QuoteResult, CacheStrategy, QuoteCacheType } from '$lib/types';

const cacheStrategies: Record<QuoteCacheType, CacheStrategy | undefined> = {
  'SWR': { swr: 30 },
  'TTL': { ttl: 30 },
  'No caching': undefined,
  'TTL + SWR': { ttl: 30, swr: 60 },
};

export async function GET({ url }: { url: URL }) {
  const cache = decodeURIComponent(url.searchParams.get('cache') || '') as QuoteCacheType;

  const parser = z.enum(["TTL", "SWR", "TTL + SWR", "No caching"]);
  const parsedOutput = await parser.safeParseAsync(cache);

  if (!parsedOutput.success) {
    return json({ error: 'Invalid search parameter.' }, { status: 400 });
  }

  const cacheType: QuoteCacheType = parsedOutput.data;

  const cacheStrategy = cacheStrategies[cacheType];

  if (cacheStrategy === undefined && cacheType !== 'No caching') {
    return json({ error: 'Invalid cache strategy.' }, { status: 400 });
  }

  const data = await getQuotes(cacheStrategy);

  return json(data);
}
