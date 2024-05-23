<script setup lang="ts">
definePageMeta({
  middleware: 'dashboard-guard',
})
</script>

<template>
  <main>
    <div>
      <Header />
      <h2><strong style="color: black">Produit</strong> - Dashboard</h2>
      <ProductsProductById />
    </div>
  </main>
</template>

<style lang="scss" scoped>
h2 {
  margin-top: 2rem;
  margin-left: 1rem;
}
</style>
