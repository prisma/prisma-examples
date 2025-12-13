<template>
  <div class="page">
    <div v-if="status === 'pending'" class="loading-state">
      <span class="loading"></span>
      <p>Loading post...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>😔 Post not found</p>
      <NuxtLink to="/" class="btn btn-primary">Back to Feed</NuxtLink>
    </div>

    <article v-else-if="data" class="post-detail">
      <header class="post-header">
        <NuxtLink to="/" class="back-link">← Back to Feed</NuxtLink>
        
        <div class="meta">
          <span class="status" :class="data.published ? 'published' : 'draft'">
            {{ data.published ? 'Published' : 'Draft' }}
          </span>
          <time>{{ formatDate(data.createdAt) }}</time>
        </div>

        <h1 class="title">{{ data.title }}</h1>
        
        <div class="author">
          <div class="avatar">
            {{ data.author?.name?.charAt(0)?.toUpperCase() ?? '?' }}
          </div>
          <div class="author-info">
            <span class="author-name">{{ data.author?.name ?? 'Unknown author' }}</span>
            <span class="author-email">{{ data.author?.email ?? '' }}</span>
          </div>
        </div>
      </header>

      <div class="content" v-if="data.content">
        {{ data.content }}
      </div>
      <div class="content empty" v-else>
        <p>No content yet...</p>
      </div>

      <footer class="post-actions">
        <button
          v-if="!data.published"
          class="btn btn-success"
          :disabled="isPublishing"
          @click="publish"
        >
          {{ isPublishing ? 'Publishing...' : '✓ Publish' }}
        </button>
        
        <button
          class="btn btn-danger"
          :disabled="isDeleting"
          @click="confirmDelete"
        >
          {{ isDeleting ? 'Deleting...' : '🗑 Delete' }}
        </button>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string

const { data, status, error } = await useFetch<Post>(`/api/posts/${id}`, {
  lazy: true
})

const isPublishing = ref(false)
const isDeleting = ref(false)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

const publish = async () => {
  isPublishing.value = true
  
  try {
    await $fetch(`/api/posts/${id}/publish`, { method: 'PUT' })
    router.push('/')
  } catch (error) {
    console.error('Failed to publish:', error)
  } finally {
    isPublishing.value = false
  }
}

const confirmDelete = async () => {
  if (!confirm('Are you sure you want to delete this post?')) return
  
  isDeleting.value = true
  
  try {
    await $fetch(`/api/posts/${id}`, { method: 'DELETE' })
    router.push('/')
  } catch (error) {
    console.error('Failed to delete:', error)
  } finally {
    isDeleting.value = false
  }
}
</script>

<style scoped>
.page {
  padding: 2rem 0;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
}

.loading-state p {
  margin-top: 1rem;
}

.error-state p {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.post-detail {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.post-header {
  padding: 2rem;
  border-bottom: 1px solid var(--border-subtle);
}

.back-link {
  display: inline-block;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--accent-primary);
}

.meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.status {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status.published {
  background: rgba(35, 134, 54, 0.2);
  color: #3fb950;
}

.status.draft {
  background: rgba(210, 153, 34, 0.2);
  color: #d29922;
}

.meta time {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 500;
}

.author-email {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.content {
  padding: 2rem;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  white-space: pre-wrap;
}

.content.empty {
  text-align: center;
  color: var(--text-muted);
  font-style: italic;
}

.post-actions {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: var(--bg-tertiary);
  border-top: 1px solid var(--border-subtle);
}
</style>
