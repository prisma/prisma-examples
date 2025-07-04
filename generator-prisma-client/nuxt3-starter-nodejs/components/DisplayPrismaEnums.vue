<template>
  <div class="w-full max-w-2xl mx-auto">
    <div class="border-4 border-dashed border-red-400 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4 text-xs text-yellow-800 dark:text-yellow-200 shadow-sm">
      <div class="mb-2 font-semibold text-center">
        Debug Info: Prisma Enums (Client Side)
      </div>
      <div class="mb-1 text-center">
        Rendered on client?
        <span class="font-mono">{{ mounted ? 'Yes' : 'No' }}</span>
      </div>
      <div class="mb-2 text-center">
        <span class="font-semibold">
          QuoteKind Enum: {{ QuoteKind.Fact }}; {{ QuoteKind.Opinion }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QuoteKind } from '~/lib/generated/prisma/enums'

const mounted = ref(false)

onMounted(() => {
  // Note: this avoid "Hydration failed" errors
  mounted.value = true
})
</script>
