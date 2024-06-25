<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { handleSubmit as apiHandleSubmit } from '../../lib/api.js'

let error = ref<any>(null)

const schema = yup.object({
  email: yup
    .string()
    .email('Email invalide')
    .required('Veuillez entrer un email'),
  password: yup
    .string()
    .required('Veuillez entrer un mot de passe')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .matches(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .matches(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
    .matches(
      /[@$!%*?&]/,
      'Le mot de passe doit contenir au moins un caractère spécial (@$!%*?&)',
    ),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas')
    .required('Veuillez confirmer le mot de passe'),
  firstname: yup.string().required('Veuillez entrer un prénom'),
  lastname: yup.string().required('Veuillez entrer un nom'),
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})

const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: password_confirm, errorMessage: passwordConfirmError } =
  useField('password_confirm')
const { value: firstname, errorMessage: firstnameError } = useField('firstname')
const { value: lastname, errorMessage: lastnameError } = useField('lastname')

const userCreate = handleSubmit(async (values) => {
  try {
    await apiHandleSubmit(values)
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
        <h1>Ajouter un utilisateur</h1>
        <form @submit.prevent="userCreate">
          <div class="email_field">
            <label for="email">Email <span style="color: red">*</span></label>
            <input type="text" id="email" v-model="email" autocomplete="off" />
            <span v-if="emailError" class="error">{{ emailError }}</span>
          </div>
          <div class="pass_field">
            <label for="password"
              >Mot de passe <span style="color: red">*</span></label
            >
            <input
              type="password"
              id="password"
              v-model="password"
              autocomplete="off"
            />
            <span v-if="passwordError" class="error">{{ passwordError }}</span>
          </div>
          <div class="pass_field">
            <label for="password_confirm"
              >Confirmer le mot de passe
              <span style="color: red">*</span></label
            >
            <input
              type="password"
              id="password_confirm"
              v-model="password_confirm"
              autocomplete="off"
            />
            <span v-if="passwordConfirmError" class="error">{{
              passwordConfirmError
            }}</span>
          </div>
          <div class="firstname_field">
            <label for="firstname"
              >Prénom <span style="color: red">*</span></label
            >
            <input type="text" id="firstname" v-model="firstname" />
            <span v-if="firstnameError" class="error">{{
              firstnameError
            }}</span>
          </div>
          <div class="lastname_field">
            <label for="lastname"
              >Nom de famille <span style="color: red">*</span></label
            >
            <input type="text" id="lastname" v-model="lastname" />
            <span v-if="lastnameError" class="error">{{ lastnameError }}</span>
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
