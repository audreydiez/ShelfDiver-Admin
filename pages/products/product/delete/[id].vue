<script setup lang="ts">
definePageMeta({
  middleware: 'dashboard-guard',
})

let jwt: any = null

if (typeof localStorage !== 'undefined') {
  jwt = localStorage.getItem('jwt')
}

const runtimeConfig = useRuntimeConfig()
const route = useRoute()

async function deleteProduct() {
  await $fetch(`${runtimeConfig.public.products}/delete/${route.params.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })

  await navigateTo('/products')
}
</script>

<template>
  <main>
    <div>
      <Header />
      <h2>
        <strong style="color: black">Supprimer un produit</strong> - Dashboard
      </h2>
      <div class="container">
        <div class="delete_content">
          <p style="color: red">
            <strong
              >Voulez-vous vraiment supprimer ce produit ? Cette action est
              irréversible.</strong
            >
          </p>
          <button class="confirm_button" @click="deleteProduct()">
            Supprimer
          </button>
          <button class="abort_button" @click="navigateTo('/products')">
            Annuler
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
h2 {
  margin-top: 2rem;
  margin-left: 1rem;
}

.container {
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  padding: 2.5rem 2rem;
  width: fit-content;
  background-color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 12px -7px #000000;
}

.confirm_button {
  background-color: red;
  color: white;
  margin-top: 2rem;
  height: 2.5rem;
  width: 15rem;
  border-radius: 10px;
  border-style: none;
}

.abort_button {
  background-color: black;
  color: white;
  margin-top: 2rem;
  height: 2.5rem;
  width: 15rem;
  border-radius: 10px;
  border-style: none;
}
</style>
