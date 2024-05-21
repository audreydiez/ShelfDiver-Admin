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
</script>

<template>
  <main>
    <div>
      <Header />
      <h2><strong style="color: black">Utilisateurs</strong> - Dashboard</h2>
      <UsersAllUsers />
    </div>
  </main>
</template>

<style lang="scss" scoped>
h2 {
  margin-top: 2rem;
  margin-left: 1rem;
}
</style>
