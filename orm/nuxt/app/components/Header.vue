<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <NuxtLink to="/" class="logo-link">
          <span class="logo-icon">◇</span>
          <span class="logo-text">Prisma Blog</span>
        </NuxtLink>
      </div>
      
      <nav class="nav">
        <NuxtLink to="/" class="nav-link" :class="{ active: route.path === '/' }">
          Feed
        </NuxtLink>
        <NuxtLink to="/drafts" class="nav-link" :class="{ active: route.path === '/drafts' }">
          Drafts
        </NuxtLink>
      </nav>

      <div class="actions">
        <NuxtLink to="/signup" class="btn btn-ghost">
          Sign up
        </NuxtLink>
        <NuxtLink to="/create" class="btn btn-primary">
          <span>+</span> New Post
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style scoped>
.header {
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(12px);
  background: rgba(13, 17, 23, 0.8);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.125rem;
}

.logo-link:hover {
  color: var(--text-primary);
}

.logo-icon {
  font-size: 1.5rem;
  color: var(--accent-primary);
}

.nav {
  display: flex;
  gap: 0.5rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-tertiary);
}

.nav-link.active {
  color: var(--text-primary);
  background: var(--bg-tertiary);
}

.actions {
  display: flex;
  gap: 0.75rem;
}

@media (max-width: 640px) {
  .header-content {
    padding: 1rem;
  }
  
  .logo-text {
    display: none;
  }
  
  .nav {
    display: none;
  }
}
</style>
