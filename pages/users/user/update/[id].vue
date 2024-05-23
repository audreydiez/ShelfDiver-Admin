<script setup lang="ts">
import { jwtDecode } from 'jwt-decode'

definePageMeta({
  middleware: 'dashboard-guard',
})

let jwt = null
let decodedJwt: any = null

if (typeof localStorage !== 'undefined') {
  jwt = localStorage.getItem('jwt')
}

if (typeof jwt === 'string') {
  decodedJwt = jwtDecode(jwt)
}

if (decodedJwt.sub != 'ADMIN') {
  navigateTo('/dashboard')
}

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const { data: user } = await useFetch(
  `${runtimeConfig.public.users}/user/${route.params.id}`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  },
)
</script>

<template>
  <main>
    <div>
      <Header />
      <h2><strong style="color: black">Utilisateur</strong> - Dashboard</h2>
      <UsersUpdateForm />
    </div>
  </main>
</template>

<style lang="scss" scoped>
h2 {
  margin-top: 2rem;
  margin-left: 1rem;
}
</style>
