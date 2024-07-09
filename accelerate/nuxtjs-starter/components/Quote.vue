<template>
	<QuoteWrapper :title="title" :type="type">
	  <div class="flex flex-col">
		<div v-if="loading" class="text-lg text-gray-500">Loading...</div>
		<p v-else-if="result?.data" class="text-lg">
		  <span class="text-green-300">ID {{ id }}</span> ⸺ '"
		  <span v-html="quote"></span>
		  "'
		</p>
		<br v-if="result?.data" />
		<p v-if="result?.data" class="text-lg font-normal text-black ">
		  <span class="mt-3.5">Created At</span> ⸺
		  {{ formatDate(createdAt) }}
		</p>
		<div v-if="result?.data" class="my-2 h-0.5 border-t-0 bg-neutral-100 opacity-100 opacity-50"></div>
		<div v-if="result?.data">
		  <br />
		  <p>
			Cache Node Region ⸺
			<span class="font-bold">
			  {{ findIATA(region)?.city || region }}
			</span>
		  </p>
		  <br />
		  <p>
			Cached Modified at ⸺
			<span class="font-bold">
			  {{ formatDate(lastModified) }}
			</span>
		  </p>
		  <br />
		  <p>
			Cache status ⸺
			<span class="font-bold" :class="{
			  'text-green-400': cacheStatus === 'swr' || cacheStatus === 'ttl',
			  'text-red-400': cacheStatus !== 'swr' && cacheStatus !== 'ttl'
			}">
			  {{ cacheStatus?.toUpperCase() }}
			  {{ cacheStatus === 'swr' || cacheStatus === 'ttl'
				? ' CACHE HIT'
				: '' }}
			</span>
		  </p>
		  <br />
		  <p>
			Time taken: <span class="font-bold"> {{ result.time }}ms</span>
		  </p>
		  <br />
		</div>
		<p v-else class="text-red-500">No data available</p>
	  </div>
	</QuoteWrapper>
  </template>
  
  <script setup lang="ts">
  import { defineProps, computed, ref, onMounted } from 'vue';
  import QuoteWrapper from './QuoteWrapper.vue';
  import type { QuoteResult, QuoteCacheType } from '@/lib/types';
  import { findIATA } from 'openflights-cached';
  
  const props = defineProps<{
	title: string;
	type: QuoteCacheType;
	result: QuoteResult | null;
  }>();
  
  const loading = ref(true);
  
  const id = computed(() => props.result?.data?.id);
  const quote = computed(() => props.result?.data?.quote);
  const createdAt = computed(() => props.result?.data?.createdAt || '');
  const region = computed(() => props.result?.info?.region || '');
  const lastModified = computed(() => props.result?.info?.lastModified || '');
  const cacheStatus = computed(() => props.result?.info?.cacheStatus || '');
  
  function formatDate(date: string | undefined) {
	return date ? new Date(date).toLocaleString('en-US') : 'N/A';
  }
  
  onMounted(() => {
	if (props.result) {
	  loading.value = false;
	}
  });
  </script>
  