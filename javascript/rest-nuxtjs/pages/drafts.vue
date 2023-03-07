<template>
  <div class="page">
    <h1>Drafts</h1>
    <main>
      <p v-if="pending">
        <span class="loading"></span>
      </p>
      <p v-else-if="error">Error while fetching drafts 💔</p>
      <div v-else>
        <Post class="post" v-for="post in drafts" :key="post.id" :post="post" />
      </div>
    </main>
  </div>
</template>
<script setup>

const { data: drafts, error, pending } = await useFetch('/api/drafts')

</script>
<style scoped>
.post {
  background: white;
  transition: box-shadow 0.1s ease-in;
}

.post:hover {
  box-shadow: 1px 1px 3px #aaa;
}

.post+.post {
  margin-top: 2rem;
}
</style>
