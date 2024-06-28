<script lang="ts">
  import { onMount } from 'svelte'
  import type { QuoteResult } from '$lib/types'
  import Quote from '../components/Quote.svelte'
  import { HOST } from '$lib/utils/helper'

  let ttl: QuoteResult | null = null
  let swr: QuoteResult | null = null
  let both: QuoteResult | null = null
  let none: QuoteResult | null = null

  const fetchQuotes = async (type: string): Promise<QuoteResult> => {
    try {
      const res = await fetch(
        `${HOST}/api/quotes?cache=${encodeURIComponent(type)}`,
      )
      return res.json()
    } catch (error) {
      console.error('Failed to fetch quotes:', error)
      throw error
    }
  }

  onMount(async () => {
    try {
      ttl = await fetchQuotes('TTL')
      swr = await fetchQuotes('SWR')
      both = await fetchQuotes('TTL + SWR')
      none = await fetchQuotes('No caching')
    } catch (error) {
      console.error('Failed to fetch quotes:', error)
    }
  })
</script>

<main class="flex min-h-screen flex-col items-center justify-start p-8 md:p-24">
  <h1 class="text-3xl text-slate-800 dark:text-white">Accelerated Quotes</h1>
  <p class="text-xl text-slate-800 dark:text-slate-200">
    Retrieves the most recently added quote with and without caching enabled
  </p>
  <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-9">
    <Quote title="Cached Quote" type="TTL" result={ttl} />
    <Quote title="Cached Quote" type="SWR" result={swr} />
    <Quote title="Cached Quote" type="TTL + SWR" result={both} />
    <Quote title="Quote" type="No caching" result={none} />
  </div>
</main>
