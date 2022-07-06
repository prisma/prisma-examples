<script>
  import { goto } from '$app/navigation'

  let name, email
  
  async function submit() {
    try {
      const body = { name, email }
      await fetch('/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await goto('/')
    } catch (error) {
      console.error(error)
    }
  }
</script>

<div class="page">
  <form on:submit|preventDefault={submit}>
    <h1>Signup user</h1>
    <input
      placeholder="Name"
      type="text"
      required
      bind:value={name}
    />
    <input
      placeholder="Email address"
      type="email"
      required
      bind:value={email}
    />
    <input
      disabled={!name || !email}
      type="submit"
      value="Signup"
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
  }

  input[type='text'],
  input[type='email'] {
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
