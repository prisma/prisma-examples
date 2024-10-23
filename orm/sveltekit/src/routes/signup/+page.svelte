<script lang="ts">
  import type { ActionData } from './$types'

  interface Props {
    form: ActionData;
  }

  let { form }: Props = $props();
</script>

<div class="page">
  <form method="post">
    <h1>Signup user</h1>
    {#if form?.missing}<p class="error">Missing field required!</p>{/if}
    {#if form?.incorrect}<p class="error">Invalid e-mail address!</p>{/if}
    <input
      placeholder="Name"
      type="text"
      name="name"
      value={form?.name ?? ""}
    />
    <input
      placeholder="Email address"
      type="text"
      name="userEmail"
      value={form?.userEmail ?? ""}
    />
    <button type="submit">Signup</button>

    <a class="back" href="/"> or Cancel </a>
  </form>
</div>

<style scoped>
  .page {
    background: white;
    padding: 3rem;
    display: flex;
    justify-content: center;
  }

  input[type="text"] {
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
