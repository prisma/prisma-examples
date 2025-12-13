<template>
  <div class="page">
    <div class="form-container">
      <div class="form-header">
        <div class="icon">👤</div>
        <h1>Create Account</h1>
        <p>Join our community of writers</p>
      </div>

      <form @submit.prevent="signup" class="form">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Your name"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="your@email.com"
            required
          />
        </div>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <div class="form-actions">
          <NuxtLink to="/" class="btn btn-ghost">Cancel</NuxtLink>
          <button
            type="submit"
            class="btn btn-success"
            :disabled="!name || !email || isSubmitting"
          >
            {{ isSubmitting ? 'Creating...' : 'Sign Up' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const name = ref('')
const email = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')

const signup = async () => {
  if (!name.value || !email.value) return

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    await $fetch('/api/users', {
      method: 'POST',
      body: {
        name: name.value,
        email: email.value
      }
    })
    router.push('/')
  } catch (error: any) {
    if (error.statusCode === 409) {
      errorMessage.value = 'A user with this email already exists'
    } else {
      errorMessage.value = 'Failed to create account. Please try again.'
    }
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
  align-items: center;
  min-height: calc(100vh - 200px);
}

.form-container {
  width: 100%;
  max-width: 420px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.icon {
  font-size: 3rem;
  margin-bottom: 1rem;
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
  gap: 1.25rem;
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

.error-message {
  font-size: 0.85rem;
  color: var(--accent-danger);
  text-align: center;
  padding: 0.75rem;
  background: rgba(248, 81, 73, 0.1);
  border-radius: var(--radius-sm);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1rem;
}
</style>
