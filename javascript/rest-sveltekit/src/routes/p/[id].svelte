<script>
  import { goto } from '$app/navigation'
  import { marked } from 'marked'

  export let post

  $: authorName = post.author ? post.author.name : 'Unknown author'

  async function publish() {
    await fetch(`/publish/${post.id}`, {
      method: 'PUT',
    })
    await goto('/')
  }

  async function destroy() {
    await fetch(`/p/${post.id}`, {
      method: 'DELETE',
      headers: {
        'accept': 'application/json'
      }
    })
    await goto('/')
  }
</script>

<div class="page">
  <h1>{post.title}{#if !post.published}&nbsp;(Draft){/if}</h1>
  <small>By {authorName}</small>
  {@html marked(post.content)}
  <div class="actions">
    {#if !post.published}
      <button on:click|preventDefault={publish}>Publish</button>
    {/if}
    <button on:click|preventDefault={destroy}>Delete</button>
  </div>
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
