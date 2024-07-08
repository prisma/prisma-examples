<script lang="ts">
  import { onMount, afterUpdate } from 'svelte'
  import QuoteWrapper from './QuoteWrapper.svelte'
  import pkg from 'openflights-cached'
  const { findIATA } = pkg
  import { format } from 'date-fns'
  import type { QuoteResult, QuoteCacheType } from '../lib/types'

  export let title: string
  export let type: QuoteCacheType
  export let result: QuoteResult | null

  let id: number | undefined
  let quote: string | undefined
  let createdAt: string | undefined
  let region: string | undefined
  let lastModified: string | undefined
  let cacheStatus: 'ttl' | 'swr' | 'miss' | 'none' | undefined
  let time: number | undefined

  function updateQuoteData() {
    if (result?.data) {
      id = result.data.id
      quote = result.data.quote
      createdAt = result.data.createdAt
      region = result.info?.region
      lastModified = result.info?.lastModified.toString()
      cacheStatus = result.info?.cacheStatus
      time = result.time
    }
  }

  onMount(() => {
    updateQuoteData()
  })

  afterUpdate(() => {
    updateQuoteData()
  })

  const formatDate = (date: string | undefined): string => {
    return date ? format(new Date(date), 'Pp') : 'N/A'
  }
</script>

<QuoteWrapper {title} {type}>
  <div class="flex flex-col">
    {#if result?.data}
      <p class="text-lg">
        <span class="text-green-300">ID {id}</span> ⸺ '"
        <span>{quote}</span>
        "'
      </p>
      <br />
      <p class="text-slate-500 0 text-lg font-normal">
        <span class="mt-3.5">Created At</span> ⸺ {formatDate(createdAt)}
      </p>
      <div
        class="my-2 h-0.5 border-t-0 bg-neutral-100 opacity-100 opacity-50"
      ></div>
      <div>
        <br />
        <p>
          Cache Node Region ⸺ <span class="font-bold"
            >{findIATA(region ?? '')?.city || region}</span
          >
        </p>
        <br />
        <p>
          Cached Modified at ⸺ <span class="font-bold"
            >{formatDate(lastModified)}</span
          >
        </p>
        <br />
        <p>
          Cache status ⸺
          <span
            class="font-bold {cacheStatus === 'swr' || cacheStatus === 'ttl'
              ? 'text-green-400'
              : 'text-red-400'}"
          >
            {cacheStatus?.toUpperCase()}
            {cacheStatus === 'swr' || cacheStatus === 'ttl' ? ' CACHE HIT' : ''}
          </span>
        </p>
        <br />
        <p>Time taken: <span class="font-bold">{time}ms</span></p>
        <br />
      </div>
    {:else}
      <p class="text-red-500">No data available</p>
    {/if}
  </div>
</QuoteWrapper>
