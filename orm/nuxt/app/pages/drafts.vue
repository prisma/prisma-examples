<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">Drafts</h1>
      <p class="page-subtitle">Posts waiting to be published</p>
    </div>

    <div v-if="status === 'pending'" class="loading-state">
      <span class="loading"></span>
      <p>Loading drafts...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>😔 Failed to load drafts</p>
      <button class="btn btn-primary" @click="refresh">Try again</button>
    </div>

    <div v-else-if="!data?.length" class="empty-state">
      <div class="empty-icon">✏️</div>
      <h3>No drafts yet</h3>
      <p>Create a new post to get started!</p>
      <NuxtLink to="/create" class="btn btn-primary">Create a draft</NuxtLink>
    </div>

    <div v-else class="posts-grid">
      <Post v-for="post in data" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types'

const { data, status, error, refresh } = await useFetch<Post[]>('/api/drafts', {
  lazy: true
})
</script>

<style scoped>
.page {
  padding: 2rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--accent-warning), var(--accent-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
}

.loading-state p,
.error-state p {
  margin-top: 1rem;
}

.empty-state {
  background: var(--bg-secondary);
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-lg);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.empty-state p {
  margin-bottom: 1.5rem;
}

.posts-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
