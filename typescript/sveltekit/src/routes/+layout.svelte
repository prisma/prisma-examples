<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import "$lib/styles/style.css";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="layout">
  <Header />
  {@render children?.()}
</div>

<style>
  .layout {
    padding: 0 2rem;
  }
</style>
