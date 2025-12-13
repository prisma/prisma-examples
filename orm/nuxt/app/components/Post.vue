<template>
  <article class="post-card" @click="navigate">
    <div class="post-header">
      <span class="post-status" :class="post.published ? 'published' : 'draft'">
        {{ post.published ? 'Published' : 'Draft' }}
      </span>
      <time class="post-date">{{ formatDate(post.createdAt) }}</time>
    </div>
    
    <h2 class="post-title">{{ post.title }}</h2>
    
    <p v-if="post.content" class="post-excerpt">
      {{ truncate(post.content, 150) }}
    </p>
    
    <div class="post-footer">
      <div class="post-author">
        <div class="avatar">
          {{ post.author?.name?.charAt(0)?.toUpperCase() ?? '?' }}
        </div>
        <span>{{ post.author?.name ?? 'Unknown author' }}</span>
      </div>
      <span class="read-more">Read more →</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Post } from '~/types'

const props = defineProps<{
  post: Post
}>()

const router = useRouter()

const navigate = () => {
  router.push(`/p/${props.post.id}`)
}

const truncate = (text: string, length: number) => {
  if (text.length <= length) return text
  return text.substring(0, length).trim() + '...'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>

<style scoped>
.post-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.post-card:hover {
  border-color: var(--accent-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.post-status {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.post-status.published {
  background: rgba(35, 134, 54, 0.2);
  color: #3fb950;
}

.post-status.draft {
  background: rgba(210, 153, 34, 0.2);
  color: #d29922;
}

.post-date {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.post-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
  line-height: 1.4;
}

.post-excerpt {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.post-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
}

.post-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
}

.post-author span {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.read-more {
  font-size: 0.875rem;
  color: var(--accent-primary);
  font-weight: 500;
}
</style>
