<script setup lang="ts">
let jwt = null
if (typeof localStorage !== 'undefined') {
  jwt = localStorage.getItem('jwt')
}

interface Product {
  id: number
  brand: string
  model: string
  vehicle_type: string
  price: number
}

const runtimeConfig = useRuntimeConfig()
const { data: products } = await useFetch<Product[]>(
  `${runtimeConfig.public.products}/all_products`,
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
  <div class="products">
    <h2>Liste des Produits</h2>

    <div class="add_container">
      <NuxtLink to="/products/new-product" class="add_link"
        ><img
          src="../../assets/img/add_icon.png"
          alt="search_icon"
          width="50px"
          height="50px"
      /></NuxtLink>
    </div>
    <table class="product_table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Marque</th>
          <th>Modèle</th>
          <th>Type</th>
          <th>Prix</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.brand }}</td>
          <td>{{ product.model }}</td>
          <td>{{ product.vehicle_type }}</td>
          <td>{{ product.price }}</td>
          <td>
            <NuxtLink :to="`/products/product/${product.id}`" class="link"
              ><img
                src="../../assets/img/search_icon.png"
                alt="search_icon"
                width="32px"
                height="32px"
            /></NuxtLink>
            <NuxtLink
              :to="`/products/product/update/${product.id}`"
              class="link"
              ><img
                src="../../assets/img/edit_icon.png"
                alt="edit_icon"
                width="32px"
                height="32px"
            /></NuxtLink>
            <NuxtLink
              :to="`/products/product/delete/${product.id}`"
              class="link"
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
.products {
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

.product_table {
  margin: auto;
  border-collapse: collapse;
  width: 100%;
}

.product_table th,
.product_table td {
  padding: 0.5rem;
  text-align: center;
}

.product_table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.product_table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.product_table tr:hover {
  background-color: #e6e6e6;
}

.link {
  margin: 0.1rem;
}

.add_container {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
}

@media (max-width: 992px) {
  .product_table {
    overflow: scroll;
  }

  .product_table th,
  .product_table td {
    text-align: left;
  }

  .link {
    display: inline-block;
  }
}
</style>
