<script>
  import '../app.css'
  import Header from '$lib/components/Header.svelte'
</script>

<div>
  <Header/>

  <div>
    <slot/>
  </div>
</div>

<style>
  div > div {
    padding: 0 2rem;
  }
</style>
