<template>
  <div>
    <form @submit="createDraft">
      <h1>Create Draft</h1>
      <input autoFocus placeholder="Title" type="text" v-model="title" />
      <input
        placeholder="Author (email address)"
        type="text"
        v-model="authorEmail"
      />
      <textarea cols="50" placeholder="Content" rows="8" v-model="content" />
      <input type="submit" value="Create" />
      <NuxtLink class="back" to="/"> or Cancel </NuxtLink>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return { title: '', authorEmail: '', content: '' }
  },
  methods: {
    createDraft: async function (e) {
      e.preventDefault()
      const body = {
        title: this.title,
        authorEmail: this.authorEmail,
        content: this.content,
      }

      try {
        const res = await fetch(`${location.origin}/api/post`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await res.json()
        await this.$router.push({ name: 'drafts' })
      } catch (error) {
        console.error(error)
      }
    },
  },
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
