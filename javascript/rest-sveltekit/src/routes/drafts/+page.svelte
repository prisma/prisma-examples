<script>
  import Post from '$lib/components/Post.svelte'

  export let data
</script>

<div>
  <h1>Drafts</h1>
  <main>
    <div>
      {#each data.drafts as post (post.id)}
        <Post {post} />
      {/each}
    </div>
  </main>
</div>
