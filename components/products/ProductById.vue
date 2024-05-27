<script setup lang="ts">
import { ref, onMounted } from 'vue'

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
  created_at: string
  created_by: User | null
  updated_at: string
  updated_by: User | null
}

interface Product {
  id: number
  brand: string
  model: string
  vehicle_type: string
  description: string
  image: string
  price: number
  motor_type: string
  energy: string
  transmission: string
  power: number
  fiscal_power: number
  created_at: Date
  created_by: User | null
  updated_at: Date
  updated_by: User | null
}

const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const product = ref<Product | null>(null)

const fetchProductData = async () => {
  try {
    const { data } = await useFetch<Product>(
      `${runtimeConfig.public.products}/product/${route.params.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
    )
    product.value = data.value
  } catch (error) {
    console.error('Error fetching product data:', error)
  }
}

onMounted(fetchProductData)
</script>

<template>
  <div class="container_2">
    <div class="product_id_card">
      <NuxtLink to="/products" class="link"
        ><img
          src="../../assets/img/back_icon.png"
          alt="back_icon"
          width="32px"
          height="32px"
      /></NuxtLink>
      <div class="product_id_content">
        <div class="product_details">
          <h1>Détails du produit</h1>
          <img
            :src="`${runtimeConfig.public.imageBaseUrl}/${product?.image}`"
            alt="Product image"
            width="200px"
            height="auto"
          />
          <p><strong>ID :</strong> {{ product?.id }}</p>
          <p><strong>Marque :</strong> {{ product?.brand }}</p>
          <p><strong>Modèle :</strong> {{ product?.model }}</p>
          <p><strong>Type :</strong> {{ product?.vehicle_type }}</p>
          <p><strong>Description :</strong> {{ product?.description }}</p>
          <p><strong>Prix :</strong> {{ product?.price }}</p>
          <p><strong>Motorisation :</strong> {{ product?.motor_type }}</p>
          <p><strong>Energie :</strong> {{ product?.energy }}</p>
          <p><strong>Transmission :</strong> {{ product?.transmission }}</p>
          <p><strong>Puissance DIN :</strong> {{ product?.power }}ch</p>
          <p>
            <strong>Puissance fiscale :</strong> {{ product?.fiscal_power }}CV
          </p>
          <p><strong>Créé le :</strong> {{ product?.created_at }}</p>
          <p>
            <strong>Créé par :</strong>
            {{
              product?.created_by
                ? product.created_by.firstname +
                  ' ' +
                  product.created_by.lastname
                : 'N/A'
            }}
          </p>
          <p><strong>Mis à jour le :</strong> {{ product?.updated_at }}</p>
          <p>
            <strong>Mis à jour par :</strong>
            {{
              product?.updated_by
                ? product.updated_by.firstname +
                  ' ' +
                  product.updated_by.lastname
                : 'N/A'
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  margin-bottom: 2rem;
}
.container_2 {
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product_id_card {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 2.5rem 2rem;
  width: fit-content;
  background-color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 12px -7px #000000;
}

.product_id_content {
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
  margin-bottom: 3rem;
  margin-left: auto;
  margin-right: auto;
  flex-direction: row;
  align-items: left;
  text-align: left;
}

.back_button {
  border-style: none;
  height: 2.5rem;
  width: 2.5rem;
  text-decoration: none;
  color: #ffffff;
}
</style>
