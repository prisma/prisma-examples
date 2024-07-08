import type { APIRoute } from 'astro'
import { getQuotes } from '../lib/utils/query'

export const GET: APIRoute = async () => {
  const cacheStrategies = {
    TTL: { ttl: 30 },
    SWR: { swr: 30 },
    BOTH: { ttl: 30, swr: 60 },
    NONE: undefined,
  }

  const results = await Promise.all([
    getQuotes(cacheStrategies.TTL),
    getQuotes(cacheStrategies.SWR),
    getQuotes(cacheStrategies.BOTH),
    getQuotes(cacheStrategies.NONE),
  ])

  const response = {
    cacheStrategies: {
      ttl: results[0],
      swr: results[1],
      both: results[2],
      none: results[3],
    },
  }

  return new Response(JSON.stringify(response), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
}
