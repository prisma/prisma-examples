// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@prisma/nuxt'],
  // You can learn more about the `@prisma/nuxt` module configuration options [here](https://pris.ly/configure-prisma-nuxt)
  prisma: {
    autoSetupPrisma: true,
  },
  devtools: { enabled: true },
})
