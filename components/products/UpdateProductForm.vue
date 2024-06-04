<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { handleProductUpdateSubmit } from '../../lib/api.js'

let jwt = null
if (typeof localStorage !== 'undefined') {
  jwt = localStorage.getItem('jwt')
}
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

interface Product {
  brand: string
  model: string
  vehicle_type: string
  description: string
  image: string | File | null
  price: number
  motor_type: string
  energy: string
  consumption: number
  transmission: string
  power: number
  fiscal_power: number
}

let error = ref<any>(null)
const imagePreviewUrl = ref<string | null>(null)

const schema = yup.object({
  brand: yup.string().required('Veuillez sélectionner une marque'),
  model: yup.string().required('Veuillez entrer un modèle'),
  vehicle_type: yup
    .string()
    .required('Veuillez sélectionner un type de véhicule'),
  description: yup.string(),
  image: yup.mixed(),
  price: yup
    .number()
    .typeError('Le prix doit être un nombre')
    .required('Veuillez entrer un prix')
    .positive('Le prix doit être positif'),
  motor_type: yup.string(),
  energy: yup.string().required("Veuillez sélectionner un type d'énergie"),
  consumption: yup
    .number()
    .typeError('La consommation doit être un nombre')
    .positive('La consommation doit être positive'),
  transmission: yup
    .string()
    .required('Veuillez sélectionner un type de transmission'),
  power: yup
    .number()
    .typeError('La puissance doit être un nombre')
    .positive('La puissance doit être positive'),
  fiscal_power: yup
    .number()
    .typeError('La puissance fiscale doit être un nombre')
    .positive('La puissance fiscale doit être positive'),
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})

const { value: brand, errorMessage: brandError } = useField('brand')
const { value: model, errorMessage: modelError } = useField('model')
const { value: vehicle_type, errorMessage: vehicleTypeError } =
  useField('vehicle_type')
const { value: description } = useField('description')
const { value: image, errorMessage: imageError } = useField('image')
const { value: price, errorMessage: priceError } = useField('price')
const { value: motor_type } = useField('motor_type')
const { value: energy, errorMessage: energyError } = useField('energy')
const { value: consumption, errorMessage: consumptionError } =
  useField('consumption')
const { value: transmission, errorMessage: transmissionError } =
  useField('transmission')
const { value: power, errorMessage: powerError } = useField('power')
const { value: fiscal_power, errorMessage: fiscalPowerError } =
  useField('fiscal_power')

const productUpdate = handleSubmit(async (values) => {
  try {
    await handleProductUpdateSubmit(values)
    resetForm()
    imagePreviewUrl.value = null
  } catch (err) {
    error.value = err
  }
})

onMounted(async () => {
  const { data: fetchedData } = await useFetch<Product>(
    `${runtimeConfig.public.products}/product/${route.params.id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  )
  brand.value = fetchedData?.value?.brand || ''
  model.value = fetchedData?.value?.model || ''
  vehicle_type.value = fetchedData?.value?.vehicle_type || ''
  description.value = fetchedData?.value?.description || ''
  image.value = fetchedData?.value?.image || null
  price.value = fetchedData?.value?.price || 0
  motor_type.value = fetchedData?.value?.motor_type || ''
  energy.value = fetchedData?.value?.energy || ''
  consumption.value = fetchedData?.value?.consumption || 0
  transmission.value = fetchedData?.value?.transmission || ''
  power.value = fetchedData?.value?.power || 0
  fiscal_power.value = fetchedData?.value?.fiscal_power || 0
  if (fetchedData?.value?.image) {
    imagePreviewUrl.value = `${runtimeConfig.public.imageBaseUrl}/${fetchedData?.value?.image}`
  }
})

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    image.value = file
    imagePreviewUrl.value = URL.createObjectURL(file)
  } else {
    imagePreviewUrl.value = null
  }
}
</script>

<template>
  <div class="container_4">
    <div class="product_update_form_card">
      <NuxtLink to="/products" class="link">
        <img
          src="../../assets/img/back_icon.png"
          alt="back_icon"
          width="32px"
          height="32px"
        />
      </NuxtLink>
      <div class="product_update_form_content">
        <h1>Modifier un produit</h1>
        <form @submit.prevent="productUpdate">
          <div class="brand_field">
            <label for="brand">Marque <span style="color: red">*</span></label>
            <select id="brand" name="brand" v-model="brand">
              <option value="">Sélectionnez une marque</option>
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
            <span v-if="brandError" class="error">{{ brandError }}</span>
          </div>
          <div class="model_field">
            <label for="model">Modèle <span style="color: red">*</span></label>
            <input type="text" id="model" v-model="model" />
            <span v-if="modelError" class="error">{{ modelError }}</span>
          </div>
          <div class="type_field">
            <label for="vehicle_type"
              >Type de véhicule <span style="color: red">*</span></label
            >
            <select
              id="vehicle_type"
              name="vehicle_type"
              v-model="vehicle_type"
            >
              <option value="">Sélectionnez un type de véhicule</option>
              <option value="Berline">Berline</option>
              <option value="Compacte">Compacte</option>
              <option value="Citadine">Citadine</option>
              <option value="Break">Break</option>
              <option value="Utilitaire">Utilitaire</option>
              <option value="Sportive">Sportive</option>
              <option value="4x4">4x4</option>
              <option value="SUV">SUV</option>
            </select>
            <span v-if="vehicleTypeError" class="error">{{
              vehicleTypeError
            }}</span>
          </div>
          <div class="description_field">
            <label for="description">Description</label>
            <textarea
              name="description"
              id="description"
              v-model="(description as string)"
            ></textarea>
          </div>
          <div class="price_field">
            <label for="price">Prix <span style="color: red">*</span></label>
            <input type="text" id="price" v-model="price" />
            <span v-if="priceError" class="error">{{ priceError }}</span>
          </div>
          <div class="motor_field">
            <label for="motor_type">Motorisation</label>
            <input type="text" id="motor_type" v-model="motor_type" />
          </div>
          <div class="energy_field">
            <label for="energy">Energie<span style="color: red">*</span></label>
            <select id="energy" name="energy" v-model="energy">
              <option value="">Sélectionnez un type d'énergie</option>
              <option value="Essence">Essence</option>
              <option value="Diesel">Diesel</option>
              <option value="Electrique">Electrique</option>
              <option value="Hybride">Hybride</option>
              <option value="GPL">GPL</option>
            </select>
            <span v-if="energyError" class="error">{{ energyError }}</span>
          </div>
          <div class="consumption_field">
            <label for="consumption"
              >Prix <span style="color: red">*</span></label
            >
            <input type="text" id="consumption" v-model="consumption" />
            <span v-if="consumptionError" class="error">{{
              consumptionError
            }}</span>
          </div>
          <div class="transmission_field">
            <label for="transmission"
              >Transmission<span style="color: red">*</span></label
            >
            <select
              id="transmission"
              name="transmission"
              v-model="transmission"
            >
              <option value="">Sélectionnez un type de transmission</option>
              <option value="Automatique">Automatique</option>
              <option value="Manuelle">Manuelle</option>
            </select>
            <span v-if="transmissionError" class="error">{{
              transmissionError
            }}</span>
          </div>
          <div class="power_field">
            <label for="power">Puissance (en ch)</label>
            <input type="text" id="power" v-model="power" />
            <span v-if="powerError" class="error">{{ powerError }}</span>
          </div>
          <div class="fiscal_power_field">
            <label for="fiscal_power">Puissance Fiscale (en CV)</label>
            <input type="text" id="fiscal_power" v-model="fiscal_power" />
            <span v-if="fiscalPowerError" class="error">{{
              fiscalPowerError
            }}</span>
          </div>
          <div class="image_field">
            <label for="image">Photo</label>
            <input
              type="file"
              id="image"
              name="image"
              @change="handleFileChange"
            />
            <span v-if="imageError" class="error">{{ imageError }}</span>
            <div v-if="imagePreviewUrl">
              <img
                :src="imagePreviewUrl"
                alt="Image Preview"
                width="200px"
                height="auto"
              />
            </div>
          </div>
          <div>
            <p><span style="color: red">* </span>Champs requis</p>
            <button type="submit">Modifier</button>
          </div>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container_4 {
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product_update_form_card {
  margin-top: 2rem;
  padding: 2.5rem 2rem;
  width: 22rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 12px -7px #000000;
}

.product_update_form_content {
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
