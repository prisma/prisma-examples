<template>
  <Html lang="en">
    <Head>
      <Meta charset="utf-8" />
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Title>New Nuxt App</Title>
      <Meta name="description" content="Welcome to Nuxt!" />
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
      />
      <Link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
      />
    </Head>
    <Body>
      <main class="flex min-h-screen flex-col items-center justify-start p-8 md:p-24 bg-white dark:bg-slate-900">
        <div class="text-center mb-12">
          <h1 class="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            Stack: Nuxt 3, ESM, Node.js, <pre class="inline-block">prisma-client</pre>
          </h1>
          <p class="text-xl text-slate-600 dark:text-slate-300">
            A collection of inspiring opinions and fascinating facts
          </p>
        </div>
        
        <div class="text-center mb-12">
          <DisplayPrismaEnums />
        </div>

        <Suspense>
          <Quotes :quotes="(quotes as any) || []" />
          <template #fallback>
            <QuotesLoading />
          </template>
        </Suspense>
      </main>
    </Body>
  </Html>
</template>

<script setup lang="ts">
const { data: quotes } = await useLazyFetch('/api/quotes')
</script>
