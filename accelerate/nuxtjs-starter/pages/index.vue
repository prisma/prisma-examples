<template>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Quote title="Cached Quote" type="TTL" :result="ttl" />
      <Quote title="Cached Quote" type="SWR" :result="swr" />
      <Quote title="Cached Quote" type="TTL + SWR" :result="both" />
      <Quote title="Quote" type="No caching" :result="none" />
    </div>
  </template>
  
  <script setup lang="ts">
  import Quote from '@/components/Quote.vue';
  import type { QuoteResult } from '@/lib/types';
 import { HOST } from '~/lib/utils/helper';
  
  
  // Fetch data using useFetch
  const { data: ttl } = useFetch<QuoteResult>(() => `${HOST}/api/quotes?cache=TTL`);
  const { data: swr } = useFetch<QuoteResult>(() => `${HOST}/api/quotes?cache=SWR`);
  const { data: both } = useFetch<QuoteResult>(() => `${HOST}/api/quotes?cache=BOTH`);
  const { data: none } = useFetch<QuoteResult>(() => `${HOST}/api/quotes?cache=NONE`);
  </script>
  
  