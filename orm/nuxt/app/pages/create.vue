<template>
  <div class="page">
    <div class="form-container">
      <div class="form-header">
        <h1>Create New Draft</h1>
        <p>Write something amazing</p>
      </div>

      <form @submit.prevent="createDraft" class="form">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            id="title"
            v-model="title"
            type="text"
            placeholder="Enter a captivating title..."
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Author Email</label>
          <div class="input-with-status">
            <input
              id="email"
              v-model="authorEmail"
              type="email"
              placeholder="your@email.com"
              required
              @blur="checkAuthor"
            />
            <span v-if="isCheckingAuthor" class="status checking">
              <span class="loading"></span>
            </span>
            <span v-else-if="authorEmail && authorExists" class="status success">✓</span>
            <span v-else-if="authorEmail && authorExists === false" class="status error">✗</span>
          </div>
          <p v-if="authorEmail && authorExists === false" class="error-message">
            User not found. <NuxtLink to="/signup">Sign up first</NuxtLink>
          </p>
        </div>

        <div class="form-group">
          <label for="content">Content</label>
          <textarea
            id="content"
            v-model="content"
            placeholder="Write your post content here..."
            rows="8"
          ></textarea>
        </div>

        <div class="form-actions">
          <NuxtLink to="/" class="btn btn-ghost">Cancel</NuxtLink>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="!canSubmit || isSubmitting"
          >
            {{ isSubmitting ? 'Creating...' : 'Create Draft' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const title = ref('')
const authorEmail = ref('')
const content = ref('')
const authorExists = ref<boolean | null>(null)
const isCheckingAuthor = ref(false)
const isSubmitting = ref(false)

const canSubmit = computed(() => {
  return title.value && authorEmail.value && authorExists.value === true
})

const checkAuthor = async () => {
  if (!authorEmail.value) {
    authorExists.value = null
    return
  }

  isCheckingAuthor.value = true
  
  try {
    const result = await $fetch<{ exists: boolean }>('/api/users/check', {
      method: 'POST',
      body: { email: authorEmail.value }
    })
    authorExists.value = result.exists
  } catch {
    authorExists.value = false
  } finally {
    isCheckingAuthor.value = false
  }
}

const createDraft = async () => {
  if (!canSubmit.value) return

  isSubmitting.value = true
  
  try {
    await $fetch('/api/posts', {
      method: 'POST',
      body: {
        title: title.value,
        content: content.value,
        authorEmail: authorEmail.value
      }
    })
    router.push('/drafts')
  } catch (error) {
    console.error('Failed to create draft:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.page {
  padding: 2rem 0;
  display: flex;
  justify-content: center;
}

.form-container {
  width: 100%;
  max-width: 600px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 2rem;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h1 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.form-header p {
  color: var(--text-secondary);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.input-with-status {
  position: relative;
}

.input-with-status input {
  padding-right: 3rem;
}

.status {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
}

.status.success {
  color: var(--accent-secondary);
}

.status.error {
  color: var(--accent-danger);
}

.status.checking .loading {
  width: 16px;
  height: 16px;
}

.error-message {
  font-size: 0.85rem;
  color: var(--accent-danger);
}

.error-message a {
  color: var(--accent-primary);
  text-decoration: underline;
}

textarea {
  resize: vertical;
  min-height: 150px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
}
</style>
