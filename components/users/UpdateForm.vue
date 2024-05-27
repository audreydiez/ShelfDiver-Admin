<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { handleUpdateSubmit } from '../../lib/api.js'

let error = ref<any>(null)
let jwt = null
if (typeof localStorage !== 'undefined') {
  jwt = localStorage.getItem('jwt')
}

interface User {
  email: string
  firstname: string
  lastname: string
}

const schema = yup.object({
  email: yup
    .string()
    .email('Email invalide')
    .required('Veuillez entrer un email'),
  firstname: yup.string().required('Veuillez entrer un prénom'),
  lastname: yup.string().required('Veuillez entrer un nom'),
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})

const userData = reactive({
  email: '',
  firstname: '',
  lastname: '',
})

const {
  value: email,
  errorMessage: emailError,
  setValue: setEmail,
} = useField('email', undefined, { initialValue: userData.email })
const {
  value: firstname,
  errorMessage: firstnameError,
  setValue: setFirstname,
} = useField('firstname', undefined, { initialValue: userData.firstname })
const {
  value: lastname,
  errorMessage: lastnameError,
  setValue: setLastname,
} = useField('lastname', undefined, { initialValue: userData.lastname })

watch(userData, (newValue) => {
  setEmail(newValue.email)
  setFirstname(newValue.firstname)
  setLastname(newValue.lastname)
})

// Fetch user data and fill the form fields
onMounted(async () => {
  const runtimeConfig = useRuntimeConfig()
  const route = useRoute()

  const { data: fetchedData } = await useFetch<User>(
    `${runtimeConfig.public.users}/user/${route.params.id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  )

  userData.email = fetchedData?.value?.email || ''
  userData.firstname = fetchedData?.value?.firstname || ''
  userData.lastname = fetchedData?.value?.lastname || ''
})

const userUpdate = handleSubmit(async () => {
  try {
    await handleUpdateSubmit(userData)
    resetForm()
  } catch (err) {
    error.value = err
  }
})
</script>

<template>
  <div class="container">
    <div class="user_form_card">
      <NuxtLink to="/users" class="link">
        <img
          src="../../assets/img/back_icon.png"
          alt="back_icon"
          width="32px"
          height="32px"
        />
      </NuxtLink>
      <div class="user_form_content">
        <h1>Modifier un utilisateur</h1>
        <form @submit.prevent="userUpdate">
          <div class="email_field">
            <label for="email">Email <span style="color: red">*</span></label>
            <input
              type="text"
              id="email"
              v-model="userData.email"
              autocomplete="mail"
            />
            <span v-if="emailError" class="error">{{ emailError }}</span>
          </div>
          <div class="firstname_field">
            <label for="firstname"
              >Prénom <span style="color: red">*</span></label
            >
            <input type="text" id="firstname" v-model="userData.firstname" />
            <span v-if="firstnameError" class="error">{{
              firstnameError
            }}</span>
          </div>
          <div class="lastname_field">
            <label for="lastname"
              >Nom de famille <span style="color: red">*</span></label
            >
            <input type="text" id="lastname" v-model="userData.lastname" />
            <span v-if="lastnameError" class="error">{{ lastnameError }}</span>
          </div>
          <div>
            <p><span style="color: red">* </span>Champs requis</p>
            <button type="submit">Modifier</button>
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
