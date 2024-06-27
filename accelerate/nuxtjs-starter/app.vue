<!-- <template>
  <h1>Accelerated Quote</h1>
  <NuxtIsland name="Quote"> </NuxtIsland>
</template> -->
<template>
  <div id="app">
    <main class="flex min-h-screen flex-col items-center justify-start p-8 md:p-24">
      <h1 class="text-3xl text-slate-800 dark:text-white">
        Accelerated Quotes
      </h1>
      <br />
      <p class="text-xl text-slate-800 dark:text-slate-200">
        Retrieves the most recently added quote with and without caching enabled
      </p>
      <br />
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
// You can import global components or utilities here if needed
</script>

<style>
/* Add global styles here */
html,
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  background-color: #f0f0f0;
}
</style>
