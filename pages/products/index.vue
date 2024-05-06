<script>
definePageMeta({
  middleware: 'dashboard-guard',
})
</script>

<template>
  <main>
    <div>
      <Header />
      <h2><strong style="color: black">Produits</strong> - Dashboard</h2>
    </div>
  </main>
</template>

<style lang="scss" scoped>
h2 {
  margin-top: 2rem;
  margin-left: 1rem;
}
</style>
