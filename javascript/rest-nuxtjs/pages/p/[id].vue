<template>
  <div>
    <p v-if="pending">
      <span class="loading"></span>
    </p>
    <p v-else-if="error">Error while fetching feed 💔</p>
    <main v-else>
      <h2>{{ article.title }}</h2>
      <p v-if="article.author">By {{ article.author.name }}</p>
      <p v-else>Unknown author</p>
      <div v-html="article.content"></div>
      <button @click="publishPost(article.id)" v-if="!article.published">
        Publish
      </button>
      <button @click="deletePost(article.id)">Delete</button>
    </main>
  </div>
</template>

<script setup>

const route = useRoute()
const router = useRouter()

const { data: article, error, pending } = await useFetch(() => `/api/post/${route.params.id}`)

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Post Not Found' })
}

const deletePost = async (id) => {
  const res = await useFetch(`/api/post/${route.params.id}`, {
    method: "DELETE",
  })
  if (!res.data) {
    // throw error
    throw createError({ statusCode: 404, statusMessage: 'Post Not Found' })
  }

  router.push('/')

}
const publishPost = async (id) => {
  const res = await useFetch(`/api/publish/${route.params.id}`, {
    method: "PUT",
  })
  if (!res.data) {
    // throw error
    throw createError({ statusCode: 404, statusMessage: 'Post Not Found' })
  }

  router.push('/')
}

</script>
<style scoped>
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

button button {
  margin-left: 1rem;
}
</style>
