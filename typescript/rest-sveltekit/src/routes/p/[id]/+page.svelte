<script lang="ts">
  import { goto } from '$app/navigation'
  import type { Post } from '@prisma/client'

  export let data: { post: Post & { author?: { name: string } } }

  const { post } = data

  const deletePost = async () => {
    await (
      await fetch(`/api/post/${post.id}`, {
        method: 'DELETE',
      })
    ).json()
    goto('/')
  }

  const publishPost = async () => {
    await (
      await fetch(`/api/publish/${post.id}`, {
        method: 'PUT',
      })
    ).json()
    goto('/')
  }
</script>

<div class="page">
  <main>
    <h2>{post.title}</h2>
    <p>{post.author?.name ? `By ${post.author.name}` : 'Unknown author'}</p>
    <div>
      {@html post.content}
    </div>
    <div class="actions">
      {#if !post.published}
        <button on:click={publishPost}>Publish</button>
      {/if}
      <button on:click={deletePost}>Delete</button>
    </div>
  </main>
</div>

<style>
  .page {
    background: white;
    padding: 2rem;
  }

  .actions {
    margin-top: 2rem;
  }

  button {
    background: #ececec;
    border: 0;
    border-radius: 0.125rem;
    padding: 1rem 2rem;
  }

  button + button {
    margin-left: 1rem;
  }
</style>
