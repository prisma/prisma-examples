<script lang="ts">
  import Header from '$lib/components/Header.svelte'
  import '$lib/styles/style.css'
</script>

<div class="layout">
  <Header />
  <slot />
</div>

<style>
  .layout {
    padding: 0 2rem;
  }
</style>
