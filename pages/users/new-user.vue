<script>
definePageMeta({
  middleware: 'dashboard-guard',
})
</script>

<template>
  <main>
    <div>
      <Header />
      <h2><strong style="color: black">Utilisateurs</strong> - Dashboard</h2>
      <UsersCreateForm />
    </div>
  </main>
</template>

<style lang="scss" scoped>
h2 {
  margin-top: 2rem;
  margin-left: 1rem;
}
</style>
