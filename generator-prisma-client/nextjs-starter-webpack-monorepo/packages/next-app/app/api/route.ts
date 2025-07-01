import { getQuotes } from '@/lib/utils/query'

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
