<script setup lang="ts">
import { handleUpdateSubmit } from '../../lib/api.js'
let jwt = null
if (typeof localStorage !== 'undefined') {
  jwt = localStorage.getItem('jwt')
}
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

let password = ref()
let password_confirm = ref()
let error = ref<any>(null)

interface User {
  email: string
  firstname: string
  lastname: string
}

const data = {
  email: '',
  firstname: '',
  lastname: '',
}

const userData = reactive({
  email: '',
  firstname: '',
  lastname: '',
})

const { data: fetchedData } = await useFetch<User>(
  `${runtimeConfig.public.users}/user/${route.params.id}`,
  {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  },
)

onMounted(async () => {
  userData.email = fetchedData?.value?.email || ''
  userData.firstname = fetchedData?.value?.firstname || ''
  userData.lastname = fetchedData?.value?.lastname || ''
})

async function userCreate() {
  try {
    await handleUpdateSubmit(userData)
  } catch (err) {
    error.value = err
  }
}
</script>

<template>
  <div class="container">
    <div class="user_form_card">
      <NuxtLink to="/users" class="link"
        ><img
          src="../../assets/img/back_icon.png"
          alt="back_icon"
          width="32px"
          height="32px"
      /></NuxtLink>
      <div class="user_form_content">
        <h1>Modifier un utilisateur</h1>
        <form @submit.prevent="userCreate">
          <div class="email_field">
            <label for="email">Email <span style="color: red">*</span></label>
            <input
              type="text"
              id="email"
              v-model="userData.email"
              autocomplete="mail"
            />
          </div>
          <!-- <div class="pass_field">
            <label for="password"
              >Mot de passe <span style="color: red">*</span></label
            >
            <input
              type="password"
              id="password"
              v-model="userData.password"
              autocomplete="new-password"
            />
          </div>
          <div class="pass_field">
            <label for="password_confirm"
              >Confirmer le mot de passe
              <span style="color: red">*</span></label
            >
            <input
              type="password"
              id="password_confirm"
              autocomplete="new-password"
            />
          </div> -->
          <div class="firstname_field">
            <label for="firstname"
              >Prénom <span style="color: red">*</span></label
            >
            <input type="text" id="firstname" v-model="userData.firstname" />
          </div>
          <div class="lastname_field">
            <label for="lastname"
              >Nom de famille <span style="color: red">*</span></label
            >
            <input type="text" id="lastname" v-model="userData.lastname" />
          </div>
          <div>
            <p><span style="color: red">* </span>Champs requis</p>
            <button type="submit">Ajouter</button>
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
}

.user_form_card {
  margin-top: 2rem;
  padding: 2.5rem 2rem;
  width: 22rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 12px -7px #000000;
}

.user_form_content {
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
  margin-bottom: 3rem;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.back_button {
  border-style: none;
  height: 2.5rem;
  width: 2.5rem;
  text-decoration: none;
  color: #ffffff;
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
