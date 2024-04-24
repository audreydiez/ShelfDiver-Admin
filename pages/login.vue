<script setup lang="ts">
import { login } from '../lib/api.js'
const credentials = {
  email: '',
  password: '',
}
async function userLogin() {
  try {
    await login(credentials)
  } catch (error) {
    console.error('Error logging in:', error)
  }
}
</script>

<template>
  <div id="login_card">
    <form @submit.prevent="userLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="credentials.email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="credentials.password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.login_card {
  display: flex;
  flex-direction: column;
  margin: 20rem;
  height: 35rem;
  width: 20rem;
  background-color: white;
  border-radius: 25px;
}
</style>
