<template>
  <div id="app">
    <main class="flex min-h-screen flex-col items-center justify-start p-8 md:p-24">
      <h1 class="text-3xl text-slate-800 text-black">
        Accelerated Quotes
      </h1>
      <br />
      <p class="text-xl text-slate-800">
        Retrieves the most recently added quote with and without caching enabled
      </p>
      <br />
      <button @click="refreshPage" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:ring-green-800">
      Refresh
    </button>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
const refreshPage = () => {
  window.location.reload();
};
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
