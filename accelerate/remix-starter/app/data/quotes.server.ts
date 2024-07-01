import { getQuotes } from "./query.server";

export async function getQuotesFromDB(cacheStrategy: string) {
  const map = new Map();

  // When TTL is selected
  map.set("TTL", {
    ttl: 30,
  });

  // When SWR is selected
  map.set("SWR", {
    swr: 30,
  });

  // When TTL + SWR is selected
  map.set("BOTH", {
    ttl: 30,
    swr: 60,
  });

  // This ensures no caching is performed and only the Accelerate connection pool is used
  map.set("NONE", undefined);

  const data = await getQuotes(map.get(cacheStrategy));

  return data;
}
