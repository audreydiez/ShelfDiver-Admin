<script setup lang="ts">
let jwt = null
if (typeof localStorage !== 'undefined') {
  jwt = localStorage.getItem('jwt')
}

interface User {
  id: number
  email: string
  role: string
  lastname: string
  firstname: string
}

const runtimeConfig = useRuntimeConfig()
const { data: users } = await useFetch<User[]>(
  `${runtimeConfig.public.users}/all_users`,
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
  <div class="users">
    <h2>Liste des Utilisateurs</h2>

    <div class="add_container">
      <NuxtLink to="/users/new-user" class="add_link"
        ><img
          src="../../assets/img/add_icon.png"
          alt="search_icon"
          width="50px"
          height="50px"
      /></NuxtLink>
    </div>
    <table class="user_table">
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
            <NuxtLink :to="`/users/user/${user.id}`" class="link"
              ><img
                src="../../assets/img/search_icon.png"
                alt="search_icon"
                width="32px"
                height="32px"
            /></NuxtLink>
            <NuxtLink :to="`/users/user/update/${user.id}`" class="link"
              ><img
                src="../../assets/img/edit_icon.png"
                alt="edit_icon"
                width="32px"
                height="32px"
            /></NuxtLink>
            <NuxtLink to="/users/delete" class="link"
              ><img
                src="../../assets/img/delete_icon.png"
                alt="delete_icon"
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

.user_table {
  margin: auto;
  border-collapse: collapse;
}

.user_table th,
.user_table td {
  padding: 0.5rem;
  text-align: center;
}

.user_table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.user_table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.user_table tr:hover {
  background-color: #e6e6e6;
}

.link {
  margin: 0.1rem;
}

.add_container {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  margin-left: 36rem;
}

@media (max-width: 992px) {
  .user_table {
    overflow: scroll;
  }

  .user_table th,
  .user_table td {
    text-align: left;
  }

  .link {
    display: inline-block;
  }

  .add_container {
    justify-content: left;
    margin-left: 0rem;
  }
}
</style>
