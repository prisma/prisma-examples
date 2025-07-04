<template>
  <div class="w-full max-w-6xl mx-auto space-y-12">
    <div class="text-center mb-8">
      <p class="text-lg text-slate-600 dark:text-slate-300">
        Found {{ quotes.length }} quotes total • {{ opinions.length }} opinions •
        {{ facts.length }} facts
      </p>
    </div>

    <!-- Opinions Section -->
    <section>
      <div class="flex items-center gap-3 mb-6">
        <div class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900">
          <span class="text-2xl">💭</span>
        </div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">
          Opinions ({{ opinions.length }})
        </h2>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="quote in opinions"
          :key="quote.id"
          class="group p-6 rounded-xl border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
        >
          <div class="flex items-start gap-3">
            <span class="text-blue-500 dark:text-blue-400 text-2xl shrink-0">
              "
            </span>
            <div class="flex-1">
              <p class="text-slate-700 dark:text-slate-200 leading-relaxed mb-3">
                {{ quote.quote }}
              </p>
              <div class="flex items-center justify-between text-xs">
                <span class="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 font-medium">
                  Opinion
                </span>
                <span class="text-slate-500 dark:text-slate-400">
                  #{{ quote.id }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Facts Section -->
    <section>
      <div class="flex items-center gap-3 mb-6">
        <div class="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900">
          <span class="text-2xl">🧠</span>
        </div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">
          Facts ({{ facts.length }})
        </h2>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="quote in facts"
          :key="quote.id"
          class="group p-6 rounded-xl border border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
        >
          <div class="flex items-start gap-3">
            <span class="text-green-500 dark:text-green-400 text-2xl shrink-0">
              ✓
            </span>
            <div class="flex-1">
              <p class="text-slate-700 dark:text-slate-200 leading-relaxed mb-3">
                {{ quote.quote }}
              </p>
              <div class="flex items-center justify-between text-xs">
                <span class="px-2 py-1 rounded-full bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 font-medium">
                  Fact
                </span>
                <span class="text-slate-500 dark:text-slate-400">
                  #{{ quote.id }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { QuoteKind } from '~/lib/prisma-enums'
import type { Quote } from '~/lib/types'

interface Props {
  quotes: Quote[]
}

const props = defineProps<Props>()

const opinions = computed(() => props.quotes.filter((quote) => quote.kind === QuoteKind.Opinion))
const facts = computed(() => props.quotes.filter((quote) => quote.kind === QuoteKind.Fact))
</script>
