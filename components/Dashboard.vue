<script setup lang="ts">
import { logout } from '../lib/api.js'
import { jwtDecode } from 'jwt-decode'

definePageMeta({
  middleware: 'dashboard-guard',
})

const jwtData = localStorage.getItem('jwt')
let decodedJwt: any = null

if (typeof jwtData === 'string') {
  decodedJwt = jwtDecode(jwtData)
}

async function logOut() {
  await logout()
  await navigateTo('/login')
}
</script>

<template>
  <div>
    <nav>
      <a href="placeholder" v-if="decodedJwt.sub === 'ADMIN'">Users</a>
      <a href="placeholder">Products</a>
      <a href="placeholder">Properties</a>
    </nav>
    <h1>Bienvenue {{ decodedJwt.username }}</h1>
    <h2>Votre rôle est : {{ decodedJwt.sub }}</h2>
    <button v-on:click="logOut()">Logout</button>
  </div>
</template>

<style lang="scss" scoped></style>
