<script lang="ts">
  import { goto } from '$app/navigation'

  let title = ''
  let authorEmail = ''
  let content = ''

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    await (
      await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          authorEmail,
          content,
        }),
      })
    ).json()

    goto('/drafts')
  }
</script>

<div class="page">
  <form on:submit={handleSubmit}>
    <h1>Create Draft</h1>
    <input placeholder="Title" type="text" bind:value={title} />
    <input
      placeholder="Author (email address)"
      type="email"
      bind:value={authorEmail}
    />
    <textarea cols="50" placeholder="Content" rows="8" bind:value={content} />
    <input
      type="submit"
      value="Create"
      disabled={!title || !authorEmail || !content}
    />
    <a class="back" href="/"> or Cancel </a>
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
  input[type='email'],
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
  }
</style>
