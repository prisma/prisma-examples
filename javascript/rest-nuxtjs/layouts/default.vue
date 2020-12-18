<template>
  <div class="layout">
    <Header />
    <Nuxt />
  </div>
</template>
<script>
import Header from '@/components/Header'

export default {
  components: {
    Header,
  },
}
</script>
<style>
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  background: rgba(0, 0, 0, 0.05);
}

input,
textarea {
  font-size: 16px;
}

button {
  cursor: pointer;
}
.layout {
  padding: 0 2rem;
}
</style>
