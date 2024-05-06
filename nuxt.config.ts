// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/main.scss'],
  modules: ['@vueuse/nuxt', '@nuxt/content'],
  ssr: false,
  runtimeConfig: {
    public: {
      auth: `${process.env.BASE_URL}/auth`,
      users: `${process.env.BASE_URL}/users`,
    },
  },
})
