<script setup lang="ts">
definePageMeta({
  middleware: 'dashboard-guard',
})

let jwt = null

if (typeof localStorage !== 'undefined') {
  jwt = localStorage.getItem('jwt')
}
</script>

<template>
  <main>
    <div>
      <Header />
      <h2><strong style="color: black">Produits</strong> - Dashboard</h2>
      <ProductsCreateProductForm />
    </div>
  </main>
</template>

<style lang="scss" scoped>
h2 {
  margin-top: 2rem;
  margin-left: 1rem;
}
</style>
