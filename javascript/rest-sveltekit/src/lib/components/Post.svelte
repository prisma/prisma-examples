<script>
  import { marked } from 'marked'

  export let post 

  $: authorName = post.author ? post.author.name : 'Unknown author'
</script>

<a href="/p/{post.id}">
  <article>
    <h2>{post.title}</h2>
    <small>By {authorName}</small>
    {@html marked(post.content)}
  </article>
</a>

<style>
  article {
    color: inherit;
    padding: 2rem;
  }
</style>
