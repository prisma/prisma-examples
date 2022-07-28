<template>
  <div>
    <p v-if="$fetchState.pending">
      <span class="loading"></span>
    </p>
    <p v-else-if="$fetchState.error">Error while fetching feed 💔</p>
    <main v-else>
      <h2>{{ article.title }}</h2>
      <p v-if="article.author">By {{ article.author.name }}</p>
      <p v-else>Unknown author</p>
      <div v-html="article.content"></div>
      <button @click="publish(article.id)" v-if="!article.published">
        Publish
      </button>
      <button @click="destroy(article.id)">Delete</button>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      article: {},
    }
  },
  async fetch() {
    const article = await fetch(
      `${location.origin}/api/post/${this.$route.params.id}`
    ).then((res) => res.json())
    this.article = article
  },
  methods: {
    destroy: async function (id) {
      const res = await fetch(`${location.origin}/api/post/${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      this.$router.push('/')
    },
    publish: async function (id) {
      const res = await fetch(`${location.origin}/api/publish/${id}`, {
        method: 'PUT',
      })  
      const data = await res.json()
      this.$router.push('/')
    },
  },
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
