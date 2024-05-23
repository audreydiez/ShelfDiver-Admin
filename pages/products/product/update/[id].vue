<script setup lang="ts">
import UpdateProductForm from '~/components/products/UpdateProductForm.vue'

definePageMeta({
  middleware: 'dashboard-guard',
})

let jwt = null

if (typeof localStorage !== 'undefined') {
  jwt = localStorage.getItem('jwt')
}

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const { data: user } = await useFetch(
  `${runtimeConfig.public.products}/product/${route.params.id}`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  },
)
</script>

<template>
  <main>
    <div>
      <Header />
      <h2><strong style="color: black">Produit</strong> - Dashboard</h2>
      <UpdateProductForm />
    </div>
  </main>
</template>

<style lang="scss" scoped>
h2 {
  margin-top: 2rem;
  margin-left: 1rem;
}
</style>
