// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@prisma/nuxt", "tailwindcss", "@nuxtjs/tailwindcss"],
  prisma:{
    autoSetupPrisma: true,
  },
  devtools: { enabled: true }
})