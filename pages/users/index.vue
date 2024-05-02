<script>
definePageMeta({
  middleware: 'dashboard-guard',
})
</script>

<template>
  <div>
    <Header />
    <h2><strong style="color: black">Utilisateurs</strong> - Dashboard</h2>
    <UsersAllUsers />
  </div>
</template>

<style lang="scss" scoped>
h2 {
  margin-top: 2rem;
  margin-left: 1rem;
}
</style>
