<template>
  <div>
    <form @submit="createDraft">
      <h1>Create Draft</h1>
      <input autoFocus placeholder="Title" type="text" v-model="title" />
      <input @keyup="checkAuthorExist" placeholder="Author (email address)" type="text" v-model="authorEmail"
      />
      <span v-if="!doesAuthorExist && authorEmail && !isLoading" >'{{ authorEmail }}' does not exists in our database.</span>
      <textarea cols="50" placeholder="Content" rows="8" v-model="content" />
      <input :class="{'primary': title && authorEmail && doesAuthorExist}" v-bind="{'disabled': !title || !authorEmail || !doesAuthorExist}" type="submit" value="Create" />
      <NuxtLink class="back" to="/"> or Cancel </NuxtLink>
    </form>
  </div>
</template>
<script setup>
  const router = useRouter();

  let title = ref();
  let authorEmail = ref();
  let content = ref();
  let doesAuthorExist = ref(false);
  let isLoading = ref(false);

  const checkAuthorExist = async () => {
    let body = {
      email: authorEmail.value
    }

    isLoading.value = true;

    await fetch('/author', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async (res)=>{
      let data = await res.json();

      if(data.length == 0){
        doesAuthorExist.value = false;
      }
      else {
        doesAuthorExist.value = true;
      }
    })
    .catch((error)=>{
      console.error(error);
    });

    isLoading.value = false;
  }

  const createDraft = async (e) => {
    e.preventDefault()
    const body = {
      title: title.value,
      authorEmail: authorEmail.value,
      content: content.value,
    }

    await fetch(`/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    .then(()=>{
      router.push({ name: 'drafts' })
    })
    .catch((error)=>{
      console.error(error);
    })
  }
</script>
<style scoped>
  .page {
    background: white;
    padding: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input[type='text'],
  textarea {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border-radius: 0.25rem;
    border: 0.125rem solid rgba(0, 0, 0, 0.2);
  }

  input[type='submit'] {
    background: #ececec;
    border: 0;
    padding: 1rem 2rem;
  }

  .back {
    margin-left: 1rem;
  }

  span {
    color: red;
  }

  .primary {
    background: blue !important;
    color: white;
  }
</style>
