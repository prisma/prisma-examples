<script lang="ts">
  import { goto } from '$app/navigation'

  let name = ''
  let email = ''

  const signup = async (e: SubmitEvent) => {
    e.preventDefault()
    await (
      await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
        }),
      })
    ).json()

    goto('/')
  }
</script>

<div class="page">
  <form on:submit={signup}>
    <h1>Signup user</h1>
    <input placeholder="Name" type="text" bind:value={name} />
    <input placeholder="Email address" type="text" bind:value={email} />
    <input disabled={!name || !email} type="submit" value="Signup" />
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

  input[type='text'] {
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
