<template>
  <div class="page">
    <form @submit="signup">
      <h1>Signup user</h1>
      <input autoFocus placeholder="Name" type="text" v-model="formData.name" />
      <input placeholder="Email address" type="text" v-model="formData.email" />
      <input :disabled="!formData.name || !formData.email" type="submit" value="Signup" />
      <NuxtLink class="back" to="/"> or Cancel </NuxtLink>
    </form>
  </div>
</template>
<script setup>

const router = useRouter()

const formData = reactive({
  name: '',
  email: '',
  authorEmail: '',
})


const signup = async (event) => {
  event.preventDefault()
  const { name, email } = formData
  const res = await useFetch('/api/user/', {
    method: "POST",
    body: JSON.stringify({ name, email })
  })
  if (!res.data) {
    throw createError({ statusCode: 400, statusMessage: 'Oops, something went wrong' })
  }

  router.push('/drafts')
}

</script>
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
