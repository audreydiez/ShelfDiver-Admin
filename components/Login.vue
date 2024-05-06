<script setup lang="ts">
import { login } from '../lib/api.js'
import { ref } from 'vue'

const credentials = {
  email: '',
  password: '',
}
let error = ref<any>(null)

async function userLogin() {
  try {
    await login(credentials)
  } catch (err) {
    error.value = err
  }
}
</script>

<template>
  <div class="container">
    <div class="login_card">
      <div class="login_content">
        <h1>Se connecter</h1>
        <form @submit.prevent="userLogin">
          <div class="email_field">
            <label for="email"></label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              v-model="credentials.email"
            />
          </div>
          <div class="pass_field">
            <label for="password"></label>
            <input
              type="password"
              id="password"
              placeholder="Mot de passe"
              v-model="credentials.password"
            />
          </div>
          <div>
            <button type="submit">Connexion</button>
          </div>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.login_card {
  padding: 5rem 2rem;
  width: 22rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 12px -7px #000000;
}

.login_content {
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
  margin-bottom: 3rem;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  align-items: center;
}

form > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem;
}

button {
  background-color: black;
  color: white;
  margin-top: 2rem;
  height: 2.5rem;
  width: 15rem;
  border-radius: 10px;
  border-style: none;
}

input {
  border-color: #f0f0f0;
  border-radius: 5px;
  border-width: 0.1rem;
  padding: 0.5rem;
  width: 15rem;
}

.error {
  color: red;
}
</style>
