<script>
  import { goto } from '$app/navigation'

  let title, content, authorEmail

  async function submit() {
    try {
      const body = { title, content, authorEmail }
      await fetch('/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await goto('/drafts')
    } catch (error) {
      console.error(error)
    }
  }
</script>

<div class="page">
  <form on:submit|preventDefault={submit}>
    <h1>Create Draft</h1>
    <input
      placeholder="Title"
      type="text"
      required
      bind:value={title}
    />
    <input
      placeholder="Author (email address)"
      type="text"
      required
      bind:value={authorEmail}
    />
    <textarea
      cols={50}
      placeholder="Content"
      rows={8}
      required
      bind:value={content}
    />
    <input
      disabled={!content || !title || !authorEmail}
      type="submit"
      value="Create"
    />
    <button class="back" on:click={() => goto('/')}>
      or Cancel
    </button>
  </form>
</div>

<style>
  .page {
    background: white;
    padding: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input[type='text'],
  textarea {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border-radius: 0.25rem;
    border: 0.125rem solid rgba(0, 0, 0, 0.2);
  }

  input[type='submit'] {
    background: #ececec;
    border: 0;
    padding: 1rem 2rem;
  }

  .back {
    margin-left: 1rem;
    background: none;
    border: none;
    text-decoration: underline;
  }
</style>
