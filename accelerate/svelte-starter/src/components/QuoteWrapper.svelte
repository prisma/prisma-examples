<script lang="ts">
  import type { QuoteCacheType } from '../lib/types'

  export let title: string
  export let type: QuoteCacheType
</script>

<div
  class="w-full h-full bg-white border border-gray-200 rounded-lg shadow p-4 bg-gray-800 border-gray-700"
>
  <div class="flex items-center justify-between">
    <h5 class="text-xl font-bold leading-none text-gray-900">
      {title}
    </h5>
    <div class="w-16"></div>
    <p class="text-xl font-medium text-blue-600 text-blue-500">{type}</p>
  </div>
  <slot></slot>
</div>
