<script>
  import Post from '$lib/components/Post.svelte'

  // data returned from +page.server.js
  export let data
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
