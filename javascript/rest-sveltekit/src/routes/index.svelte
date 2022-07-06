<script>
  import Post from '$lib/components/Post.svelte'

  export let posts
</script>

<div class="page">
  <h1>My Blog</h1>
  <main>
    {#each posts as post (post.id)}
      <div class="post">
        <Post {post}/>
      </div>
    {/each}
  </main>
</div>

<style>
  .post {
    background: white;
    transition: box-shadow 0.1s ease-in;
  }

  .post:hover {
    box-shadow: 1px 1px 3px #aaa;
  }

  .post + .post {
    margin-top: 2rem;
  }
</style>
