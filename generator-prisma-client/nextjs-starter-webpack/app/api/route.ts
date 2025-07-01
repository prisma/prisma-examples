import { getQuotes } from '@/lib/utils/query'

/**
 * `runtime = "edge"` would cause issues such as:
 *   2 |
 *   3 | var path = require('path')
 * > 4 |   , fs = require('fs')
 *     | ^
 *   5 |   , helper = require('./helper.js')
 *   6 | ;
 *   7 |
 */
// export const runtime = "edge";

// disabling caching
export const fetchCache = 'force-no-store'
export const revalidate = 0

export async function GET(_request: Request) {
  const data = await getQuotes()

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
}
