<script>
  import { page } from '$app/stores'

  $: activePath = $page.url.pathname
</script>

<header>
  <nav>
    <div class="left">
      <a href="/" class="bold" class:active={activePath === '/'}>
        Blog
      </a>
      <a href="/drafts" class:active={activePath === '/drafts'}>
        Drafts
      </a>
    </div>

    <div class="right">
      <a href="/signup" class:active={activePath === '/signup'}>
        Signup
      </a>
      <a href="/create" class:active={activePath === '/create'}>
        + Create draft
      </a>
    </div>
  </nav>
</header>

<style>
  nav {
    display: flex;
    padding: 2rem;
    align-items: center;
  }

  .bold {
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: #000;
    display: inline-block;
  }

  a.active {
    color: gray;
  }

  a + a {
    margin-left: 1rem;
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
