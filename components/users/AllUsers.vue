<script setup lang="ts">
let jwt = null
if (typeof localStorage !== 'undefined') {
  jwt = localStorage.getItem('jwt')
}

const runtimeConfig = useRuntimeConfig()
const { data: users } = await useFetch(`${runtimeConfig.public.all_users}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwt}`,
  },
})
</script>

<template>
  <div class="users">
    <h2>Liste des Utilisateurs</h2>
    <table class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Role</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.firstname }}</td>
          <td>
            <NuxtLink to="/users/user:id" class="link"
              ><img
                src="../../assets/img/search_icon.png"
                alt="home_icon"
                width="32px"
                height="32px"
            /></NuxtLink>
            <NuxtLink to="/users/update" class="link"
              ><img
                src="../../assets/img/edit_icon.png"
                alt="home_icon"
                width="32px"
                height="32px"
            /></NuxtLink>
            <NuxtLink to="/users/delete" class="link"
              ><img
                src="../../assets/img/delete_icon.png"
                alt="home_icon"
                width="32px"
                height="32px"
            /></NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.users {
  display: flex;
  flex-direction: column;
  overflow: scroll;
  width: 100%;
  padding: 1rem;
  margin: auto;
  margin-top: 5rem;
  background-color: #ffffff;
}

.users > h2 {
  margin-left: 1rem;
  margin-bottom: 1rem;
}

.user-table {
  margin: auto;
  margin-top: 5rem;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 0.5rem;
  text-align: center;
}

.user-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.user-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.user-table tr:hover {
  background-color: #e6e6e6;
}

.link {
  margin: 0.1rem;
}

@media (max-width: 992px) {
  .user-table {
    overflow: scroll;
  }

  .user-table th,
  .user-table td {
    text-align: left;
  }
  .link {
    display: inline-block;
  }
}
</style>
