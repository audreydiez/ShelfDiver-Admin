<script setup lang="ts">
import { ref, onMounted } from 'vue'

let jwt = null
if (typeof localStorage !== 'undefined') {
  jwt = localStorage.getItem('jwt')
}

interface User {
  id: number
  email: string
  role: string
  lastname: string
  firstname: string
  created_at: string
  created_by: User
  updated_at: string
  updated_by: User
}

const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const user = ref<User | null>(null)

const fetchUserData = async () => {
  try {
    const { data } = await useFetch<User>(
      `${runtimeConfig.public.users}/user/${route.params.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
    )
    user.value = data.value
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}
onMounted(fetchUserData)
</script>

<template>
  <div class="container">
    <div class="user_id_card">
      <NuxtLink to="/users" class="link"
        ><img
          src="../../assets/img/back_icon.png"
          alt="back_icon"
          width="32px"
          height="32px"
      /></NuxtLink>
      <div class="user_id_content">
        <div class="user_details" v-if="user">
          <h1>Détails de l'utilisateur</h1>
          <p><strong>ID :</strong> {{ user.id }}</p>
          <p><strong>Rôle :</strong> {{ user.role }}</p>
          <p><strong>Nom :</strong> {{ user.lastname }}</p>
          <p><strong>Prénom :</strong> {{ user.firstname }}</p>
          <p><strong>Email :</strong> {{ user.email }}</p>
          <p><strong>Créé le :</strong> {{ user.created_at }}</p>
          <p>
            <strong>Créé par :</strong>
            {{
              user.created_by
                ? user.created_by.firstname + ' ' + user.created_by.lastname
                : 'N/A'
            }}
          </p>
          <p><strong>Mis à jour le :</strong> {{ user.updated_at }}</p>
          <p>
            <strong>Mis à jour par :</strong>
            {{
              user.updated_by
                ? user.updated_by.firstname + ' ' + user.updated_by.lastname
                : 'N/A'
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  margin-bottom: 2rem;
}
.container {
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user_id_card {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 2.5rem 2rem;
  width: fit-content;
  background-color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 12px -7px #000000;
}

.user_id_content {
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
  margin-bottom: 3rem;
  margin-left: auto;
  margin-right: auto;
  flex-direction: row;
  align-items: left;
  text-align: left;
}

.back_button {
  border-style: none;
  height: 2.5rem;
  width: 2.5rem;
  text-decoration: none;
  color: #ffffff;
}
</style>
