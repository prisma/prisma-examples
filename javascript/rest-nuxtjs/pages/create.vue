<template>
  <div>
    <form @submit="createDraft">
      <h1>Create Draft</h1>
      <input autoFocus placeholder="Title" type="text" v-model="formData.title" />
      <input placeholder="Author (email address)" type="text" v-model="formData.authorEmail" />
      <textarea cols="50" placeholder="Content" rows="8" v-model="formData.content" />
      <input type="submit" value="Create" />
      <NuxtLink class="back" to="/"> or Cancel </NuxtLink>
    </form>
  </div>
</template>
<script setup>


const router = useRouter()

const formData = reactive({
  title: '',
  content: '',
  authorEmail: '',
})

const createDraft = async (event) => {
  event.preventDefault()
  console.log(formData)
  const { title, content, authorEmail } = formData
  const res = await useFetch('/api/post', {
    method: "POST",
    body: JSON.stringify({ title, content, authorEmail })
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
}
</style>
