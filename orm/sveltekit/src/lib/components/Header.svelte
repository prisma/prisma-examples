<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav>
  <div class="left">
    <a class:active={$page.url.pathname === '/'} href="/">Blog</a>
    <a class:active={$page.url.pathname === '/drafts'} href="/drafts">Drafts</a>
  </div>
  <div class="right">
    <a href="/signup">Signup</a>
    <a href="/create">+ Create draft</a>
  </div>
</nav>

<style>
  nav {
    display: flex;
    padding: 2rem;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: #000;
    display: inline-block;
  }

  a + a {
    margin-left: 1rem;
  }

  .active{
    font-weight: bold;
  }

  .right {
    margin-left: auto;
  }

  .right a {
    border: 1px solid black;
    padding: 0.5rem 1rem;
    border-radius: 3px;
  }
</style>
