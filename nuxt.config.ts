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
      all_users: process.env.ALL_USERS,
      user: process.env.USER,
      create_user: process.env.CREATE_USER,
      update_user: process.env.UPDATE_USER,
      delete_user: process.env.DELETE_USER,
    },
  },
})
