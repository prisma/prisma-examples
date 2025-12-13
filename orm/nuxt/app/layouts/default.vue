<template>
  <div class="app">
    <Header />
    <main class="main">
      <slot />
    </main>
    <footer class="footer">
      <p>Built with <span class="highlight">Nuxt</span> + <span class="highlight">Prisma</span></p>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

:root {
  --bg-primary: #0d1117;
  --bg-secondary: #161b22;
  --bg-tertiary: #21262d;
  --text-primary: #f0f6fc;
  --text-secondary: #8b949e;
  --text-muted: #6e7681;
  --accent-primary: #58a6ff;
  --accent-secondary: #238636;
  --accent-danger: #f85149;
  --accent-warning: #d29922;
  --border-color: #30363d;
  --border-subtle: #21262d;
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --font-sans: 'Geist', system-ui, -apple-system, sans-serif;
  --font-mono: 'Geist Mono', 'SF Mono', Consolas, monospace;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Space Grotesk', var(--font-sans);
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(88, 166, 255, 0.15), transparent),
    radial-gradient(ellipse 60% 40% at 100% 100%, rgba(35, 134, 54, 0.1), transparent),
    var(--bg-primary);
}

.main {
  flex: 1;
  padding: 2rem;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}

.footer {
  text-align: center;
  padding: 2rem;
  color: var(--text-muted);
  font-size: 0.875rem;
  border-top: 1px solid var(--border-subtle);
}

.footer .highlight {
  color: var(--accent-primary);
  font-weight: 500;
}

/* Global Button Styles */
button, .btn {
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: var(--accent-primary);
  color: var(--bg-primary);
  border-color: var(--accent-primary);
}

.btn-primary:hover:not(:disabled) {
  background: #79b8ff;
  border-color: #79b8ff;
}

.btn-success {
  background: var(--accent-secondary);
  color: white;
  border-color: var(--accent-secondary);
}

.btn-success:hover:not(:disabled) {
  background: #2ea043;
  border-color: #2ea043;
}

.btn-danger {
  background: transparent;
  color: var(--accent-danger);
  border-color: var(--accent-danger);
}

.btn-danger:hover:not(:disabled) {
  background: var(--accent-danger);
  color: white;
}

.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border-color: var(--border-color);
}

.btn-ghost:hover:not(:disabled) {
  color: var(--text-primary);
  border-color: var(--text-secondary);
}

button:disabled, .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Global Input Styles */
input[type="text"],
input[type="email"],
textarea {
  font-family: inherit;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-primary);
  width: 100%;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.2);
}

input::placeholder,
textarea::placeholder {
  color: var(--text-muted);
}

/* Links */
a {
  color: var(--accent-primary);
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: #79b8ff;
}

/* Loading Animation */
.loading {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-top-color: var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Card Styles */
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.card:hover {
  border-color: var(--border-subtle);
  box-shadow: var(--shadow-md);
}
</style>
