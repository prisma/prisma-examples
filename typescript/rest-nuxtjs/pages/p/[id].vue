<template>
  <div>
    <p v-if="pending">
      <span class="loading"></span>
    </p>
    <p v-else-if="error">Error while fetching feed 💔</p>
    <main v-else>
      <h2>{{ article.title }} ({{ article.published ? 'Published' : 'Draft' }})</h2>
      <p v-if="article.author">By {{ article.author.name }}</p>
      <p v-else>Unknown author</p>
      <div v-html="article.content"></div>
      <div class="btn-wrapper">
        <button @click="publish(article.id)" v-if="!article.published">Publish</button>
        <button @click="destroy(article.id)">Delete</button>
      </div>
    </main>
  </div>
</template>
<script setup>
  let article = ref({});
 
  const router = useRouter();
  const { params: { id } } = useRoute();
 
  const { pending, error, refresh } = await useLazyAsyncData('article', async () => {
    let getArticles = await fetch(`/post/${ id }`, {
      method: 'GET' 
    }).then(res => res.json());

    article.value = getArticles;
  }, { server: false }); 
 
  const destroy = async (id) => {  
    await fetch(`/post/${id}`, {
      method: 'DELETE',
    })
    .then(()=>{
      router.push('/');
    })
    .catch((error)=>{
      console.error(error);
    });
  }
    
  const publish = async (id) => {
    await fetch(`/publish/${id}`, {
      method: 'PUT',
    })  
    .then(()=>{
      router.push('/');
    })
    .catch((error)=>{
      console.error(error);
    });
  }
</script>

<style scoped>
  .page {
    background: white;
    padding: 2rem;
  }

  .actions {
    margin-top: 2rem;
  }

  button {
    margin: 0.5rem;
    background: #ececec;
    border: 1px black solid;
    border-radius: 0.125rem;
    padding: 1rem 2rem;
  }

  button button {
    margin-left: 1rem;
  }

  .btn-wrapper {
    display: flex;
    justify-content: center;
    width: fit-content;
    margin-top: 1rem;
  }
</style>
