<script setup lang="ts">
import { handleProductSubmit } from '../../lib/api.js'

let error = ref<any>(null)

const data = ref({
  brand: '',
  model: '',
  vehicle_type: '',
  description: '',
  image: null as File | null,
  price: '',
  motor_type: '',
  energy: '',
  transmission: '',
  power: '',
  fiscal_power: '',
})

async function productCreate() {
  try {
    await handleProductSubmit(data.value)
  } catch (err) {
    error.value = err
  }
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    data.value.image = file
  }
}
</script>

<template>
  <div class="container_1">
    <div class="product_form_card">
      <NuxtLink to="/products" class="link"
        ><img
          src="../../assets/img/back_icon.png"
          alt="back_icon"
          width="32px"
          height="32px"
      /></NuxtLink>
      <div class="product_form_content">
        <h1>Ajouter un produit</h1>
        <form @submit.prevent="productCreate">
          <div class="brand_field">
            <label for="email">Marque <span style="color: red">*</span></label>
            <select id="brands" name="brands" v-model="data.brand">
              <option value="Peugeot">Peugeot</option>
              <option value="Renault">Renault</option>
              <option value="Citroen">Citroen</option>
              <option value="Audi">Audi</option>
              <option value="BMW">BMW</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="Porsche">Porsche</option>
              <option value="Lamborghini">Lamborghini</option>
              <option value="Tesla">Tesla</option>
            </select>
          </div>
          <div class="model_field">
            <label for="model">Modèle <span style="color: red">*</span></label>
            <input type="text" id="model" v-model="data.model" />
          </div>
          <div class="type_field">
            <label for="type"
              >Type de véhicule <span style="color: red">*</span></label
            >
            <select id="types" name="types" v-model="data.vehicle_type">
              <option value="Berline">Berline</option>
              <option value="Compacte">Compacte</option>
              <option value="Citadine">Citadine</option>
              <option value="Break">Break</option>
              <option value="Utilitaire">Utilitaire</option>
              <option value="Sportive">Sportive</option>
              <option value="4x4">4x4</option>
              <option value="SUV">SUV</option>
            </select>
          </div>
          <div class="description_field">
            <label for="description">Description</label>
            <textarea
              name="description"
              id="description"
              v-model="data.description"
            ></textarea>
          </div>
          <div class="price_field">
            <label for="price">Prix <span style="color: red">*</span></label>
            <input type="number" id="price" v-model="data.price" />
          </div>
          <div class="motor_field">
            <label for="motor">Motorisation</label>
            <input type="text" id="motor" v-model="data.motor_type" />
          </div>
          <div class="energy_field">
            <label for="energy">Energie<span style="color: red">*</span></label>
            <select id="energies" name="energies" v-model="data.energy">
              <option value="Essence">Essence</option>
              <option value="Diesel">Diesel</option>
              <option value="Electrique">Electrique</option>
              <option value="Hybride">Hybride</option>
              <option value="GPL">GPL</option>
            </select>
          </div>
          <div class="transmission_field">
            <label for="transmission"
              >Transmission<span style="color: red">*</span></label
            >
            <select
              id="transmissions"
              name="transmissions"
              v-model="data.transmission"
            >
              <option value="Automatique">Automatique</option>
              <option value="Manuelle">Manuelle</option>
            </select>
          </div>
          <div class="power_field">
            <label for="power">Puissance (en ch)</label>
            <input type="number" id="power" v-model="data.power" />
          </div>
          <div class="fiscal_power_field">
            <label for="fiscal_power">Puissance Fiscale (en CV)</label>
            <input
              type="number"
              id="fiscal_power"
              v-model="data.fiscal_power"
            />
          </div>
          <div class="image_field">
            <label for="image">Photo</label>
            <input
              type="file"
              id="image"
              name="image"
              @change="handleFileChange"
            />
          </div>
          <div>
            <p><span style="color: red">* </span>Champs requis</p>
            <button type="submit">Ajouter</button>
          </div>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container_1 {
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product_form_card {
  margin-top: 2rem;
  padding: 2.5rem 2rem;
  width: 22rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 12px -7px #000000;
}

.product_form_content {
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
  margin-bottom: 3rem;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.back_button {
  border-style: none;
  height: 2.5rem;
  width: 2.5rem;
  text-decoration: none;
  color: #ffffff;
}

form > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem;
}

button {
  background-color: black;
  color: white;
  margin-top: 2rem;
  height: 2.5rem;
  width: 15rem;
  border-radius: 10px;
  border-style: none;
}

input {
  border-color: #f0f0f0;
  border-radius: 5px;
  border-width: 0.1rem;
  padding: 0.5rem;
  width: 15rem;
}

select {
  border-radius: 5px;
  border-width: 0.1rem;
  width: 15rem;
  height: 2rem;
  background-color: white;
}

textarea {
  border-radius: 5px;
  border-width: 0.1rem;
  width: 15rem;
  height: 5rem;
  background-color: white;
}

.error {
  color: red;
}
</style>
