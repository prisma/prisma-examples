<template>
	<div
		class="w-full h-full bg-white border border-gray-200 rounded-lg shadow p-4 bg-gray-800 border-gray-700">
		<div class="flex items-center justify-between">
			<h5 class="text-xl font-bold leading-none text-gray-900 text-white">
				{{ title }}
			</h5>
			<div class="w-16"></div>
			<p class="text-xl font-medium text-blue-600 text-blue-500">
				{{ type }}
			</p>
		</div>
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { QuoteCacheType } from '@/lib/types';

const props = defineProps<{
	title: string;
	type: QuoteCacheType;
}>();
</script>