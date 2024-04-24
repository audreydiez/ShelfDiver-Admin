// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/main.scss'],
  modules: ['@vueuse/nuxt', '@nuxt/content'],
  routeRules: {
    '/dashboard': { ssr: false },
  },
  runtimeConfig: {
    // Private keys are only available on the server

    // Public keys are also exposed to the client
    public: {
      login: process.env.LOGIN,
      profile: process.env.PROFILE,
    },
  },
})
