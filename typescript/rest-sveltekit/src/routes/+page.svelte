<script lang="ts">
  import Post from '$lib/components/Post.svelte'
  import type { PageData } from './$types'

  // data returned from +page.server.js
  export let data: PageData
</script>

<div>
  <h1>My Blog</h1>
  <main>
    <div>
      {#each data.feed as post (post.id)}
        <Post {post} />
      {/each}
    </div>
  </main>
</div>
