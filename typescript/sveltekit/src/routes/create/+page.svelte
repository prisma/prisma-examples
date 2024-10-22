<script lang="ts">
  import type { ActionData } from "./$types";

  interface Props {
    form: ActionData;
  }

  let { form }: Props = $props();
</script>

<div class="page">
  <form method="post">
    <h1>Create Draft</h1>
    {#if form?.missing}<p class="error">Missing field required!</p>{/if}
    <input
      name="title"
      placeholder="Title"
      type="text"
      value={form?.title ?? ""}
    />
    <input
      name="authorEmail"
      placeholder="Author email address"
      type="email"
      value={form?.authorEmail ?? ""}
    />
    <textarea
      name="content"
      cols="50"
      placeholder="Content"
      rows="8"
      value={form?.content ?? ""}
></textarea>
    <button type="submit">Create</button>
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

  input[type="text"],
  input[type="email"],
  textarea {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border-radius: 0.25rem;
    border: 0.125rem solid rgba(0, 0, 0, 0.2);
  }

  button[type="submit"] {
    background: #ececec;
    border: 0;
    padding: 1rem 2rem;
  }

  .back {
    margin-left: 1rem;
  }
  .error {
    color: red;
  }
</style>
