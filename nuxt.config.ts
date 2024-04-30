// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/main.scss'],
  modules: ['@vueuse/nuxt', '@nuxt/content'],
  ssr: false,
  runtimeConfig: {
    public: {
      login: process.env.LOGIN,
      profile: process.env.PROFILE,
    },
  },
})
