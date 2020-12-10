<template>
  <div @click="navigate(post)">
    <h2>{{ post.title }}</h2>
    <small v-if="post.author">By {{ post.author.name }}</small>
    <small v-else>By Unknown author</small>
    <p v-html="post.content"></p>
  </div>
</template>
<script>
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      default: [],
    },
  },
  methods: {
    navigate: function (post) {
      this.$router.push(`/p/${post.id}`)
    },
  },
}
</script>
<style scoped>
div {
  color: inherit;
  padding: 2rem;
}
</style>
