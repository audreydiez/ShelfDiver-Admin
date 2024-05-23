<script setup lang="ts">
import { jwtDecode } from 'jwt-decode'
import { logout } from '../lib/api.js'

const jwtData = localStorage.getItem('jwt')
let decodedJwt: any = null
let isOpen = ref(false)

if (typeof jwtData === 'string') {
  decodedJwt = jwtDecode(jwtData)
}

function toggleMenu(): void {
  isOpen.value = !isOpen.value
}

async function logOut() {
  await logout()
  await navigateTo('/login')
}
</script>

<template>
  <div class="header">
    <header class="header_content">
      <img
        src="../assets/img/logo.png"
        class="logo"
        alt="logo"
        width="48px"
        height="48px"
      />
      <h1>Shelfdiver</h1>
      <div class="avatar" @click="toggleMenu()">
        <div class="circle">
          <div class="letter">{{ decodedJwt.username[0] }}</div>
        </div>
        <div class="user_name">{{ decodedJwt.username }}</div>
        <div class="menu" :class="isOpen ? 'open' : 'close'" id="menu">
          <button @click="logOut()" class="menu_item">Déconnexion</button>
        </div>
      </div>
    </header>
  </div>
  <nav class="navbar">
    <ul>
      <li>
        <NuxtLink to="/dashboard" class="link"
          ><img
            src="../assets/img/home_icon.png"
            alt="home_icon"
            width="32px"
            height="32px"
          />
          Accueil</NuxtLink
        >
      </li>
      <li>
        <NuxtLink v-if="decodedJwt.sub === 'ADMIN'" to="/users" class="link"
          ><img
            src="../assets/img/users_icon.png"
            alt="users_icon"
            width="32px"
            height="32px"
          />
          Utilisateurs</NuxtLink
        >
      </li>
      <li>
        <NuxtLink to="/products" class="link"
          ><img
            src="../assets/img/product_icon.png"
            alt="products_icon"
            width="32px"
            height="32px"
          />
          Produits</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  height: 4rem;
  background-color: #22262f;
}

.header_content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 99vw;
  flex-basis: auto;
}

h1 {
  color: #ffffff;
  margin-top: 0.8rem;
  margin-left: 1rem;
}

.logo {
  margin-top: 0.6rem;
  margin-left: 1rem;
}

.navbar {
  display: flex;
  height: 3.5rem;
  background-color: #ffffff;
}

ul {
  display: flex;
  justify-content: flex-start;

  margin-top: 0.7rem;
  width: 25%;
  list-style: none;
}

li {
  margin-bottom: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

.link {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem;
  color: #525659;
  text-decoration: none;
}

.link:hover {
  background-color: lightblue;
  border-radius: 5px;
  opacity: 0.5;
  color: black;
  transform: scale(1.2);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.avatar {
  display: inline-block;
  position: relative;
  margin-left: auto;
  margin-top: 0.2rem;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #4285f4;
  display: flex;
  justify-content: center;
  align-items: center;
}

.letter {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}

.menu {
  position: fixed;
  top: 50px;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  display: none;
  z-index: 1;
}

.menu_item {
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: #333;
  border: none;
  background-color: white;
  cursor: pointer;
}

.menu_item:hover {
  background-color: #f5f5f5;
}

.user_name {
  color: white;
}

.open {
  display: block;
}

.close {
  display: none;
}
</style>
