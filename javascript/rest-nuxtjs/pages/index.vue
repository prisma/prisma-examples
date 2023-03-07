<template>
  <div class="page">
    <h1>My Blog</h1>
    <main>
      <p v-if="pending">
        <span class="loading"></span>
      </p>
      <p v-else-if="error">Error while fetching feed 💔</p>
      <div v-else>
        <Post class="post" v-for="post in feed" :key="post.id" v-bind:post="post" />
      </div>
    </main>
  </div>
</template>

<script setup>

const { data: feed, error, pending } = await useFetch('/api/feed')


</script>

<style>
.post {
  background: white;
  transition: box-shadow 0.1s ease-in;
}

.post:hover {
  box-shadow: 1px 1px 3px #aaa;
}

.post,
.post {
  margin-top: 2rem;
}
</style>
