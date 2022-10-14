<template>
  <div class="page">
    <h1>Drafts</h1>
    <main>
      <p v-if="$fetchState.pending">
        <span class="loading"></span>
      </p>
      <p v-else-if="$fetchState.error">Error while fetching drafts 💔</p>
      <div v-else>
        <Post class="post" v-for="post in drafts" :key="post.id" :post="post" />
      </div>
    </main>
  </div>
</template>
<script>
import Post from '@/components/Post'

export default {
  components: { Post },
  data() {
    return {
      drafts: [],
    }
  },
  async fetch() {
    const drafts = await fetch(`${location.origin}/api/drafts`).then((res) =>
      res.json()
    )
    this.drafts = drafts
  },
}
</script>
<style scoped>
.post {
  background: white;
  transition: box-shadow 0.1s ease-in;
}

.post:hover {
  box-shadow: 1px 1px 3px #aaa;
}

.post + .post {
  margin-top: 2rem;
}
</style>
