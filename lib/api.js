let jwt = null
if (typeof localStorage !== 'undefined') {
  jwt = localStorage.getItem('jwt')
}
const route = useRoute()

// Login function
export async function login(credentials) {
  try {
    const runtimeConfig = useRuntimeConfig()
    const response = await fetch(`${runtimeConfig.public.auth}/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    })

    if (response.status === 401) {
      throw 'Identifiants invalides'
    }

    const data = await response.json()
    if (data.token) {
      localStorage.setItem('jwt', data.token)
      await navigateTo('/dashboard')
      window.location.reload()
    }
  } catch (error) {
    throw error
  }
}

// Logout function
export async function logout() {
  try {
    await localStorage.removeItem('jwt')
  } catch (error) {
    console.error(error)
  }
}

// Create user function
export async function handleSubmit(data) {
  const runtimeConfig = useRuntimeConfig()

  try {
    if (password.value != password_confirm.value) {
      throw 'Les mots de passe ne correspondent pas.'
    }

    const { data: user, error } = await useFetch(
      `${runtimeConfig.public.users}/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(data),
      },
    )

    if (error.value) {
      console.error(error.value.data.message)
      if (Array.isArray(error.value.data.message)) {
        for (const err of error.value.data.message) {
          if (err === 'email should not be empty') {
            throw 'Veuillez entrer un email.'
          } else if (err === 'email must be an email') {
            throw 'Veuillez entrer un email valide.'
          } else if (err === 'password should not be empty') {
            throw 'Veuillez entrer un mot de passe (8 caractères min, au moins une majuscule, une minuscule, un chiffre et un caractère spécial).'
          } else if (err === 'password is not strong enough') {
            throw 'Le mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.'
          } else if (err === 'firstname should not be empty') {
            throw 'Veuillez entrer un prénom.'
          } else if (err === 'lastname should not be empty') {
            throw 'Veuillez entrer un nom de famille.'
          }
        }
      } else {
        throw error.value.data.message
      }
    }

    await navigateTo('/users')
  } catch (err) {
    console.error(err)
    throw err
  }
}

// Update user function

export async function handleUpdateSubmit(data) {
  const runtimeConfig = useRuntimeConfig()

  try {
    // if (password.value != password_confirm.value) {
    //   throw 'Les mots de passe ne correspondent pas.'
    // }

    const { data: user, error } = await useFetch(
      `${runtimeConfig.public.users}/update/${route.params.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(data),
      },
    )

    if (error.value) {
      console.error(error.value.data.message)
      if (Array.isArray(error.value.data.message)) {
        for (const err of error.value.data.message) {
          if (err === 'email should not be empty') {
            throw 'Veuillez entrer un email.'
          } else if (err === 'email must be an email') {
            throw 'Veuillez entrer un email valide.'
          } else if (err === 'password should not be empty') {
            throw 'Veuillez entrer un mot de passe (8 caractères min, au moins une majuscule, une minuscule, un chiffre et un caractère spécial).'
          } else if (err === 'password is not strong enough') {
            throw 'Le mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.'
          } else if (err === 'firstname should not be empty') {
            throw 'Veuillez entrer un prénom.'
          } else if (err === 'lastname should not be empty') {
            throw 'Veuillez entrer un nom de famille.'
          }
        }
      } else {
        throw error.value.data.message
      }
    }

    await navigateTo('/users')
  } catch (err) {
    console.error(err)
    throw err
  }
}

// Create product function

export async function handleProductSubmit(data) {
  const runtimeConfig = useRuntimeConfig()

  try {
    const formData = new FormData()

    for (const [key, value] of Object.entries(data)) {
      if (key !== 'image') {
        formData.append(key, value)
      }
    }

    if (data.image) {
      formData.append('image', data.image)
    }

    const { data: product, error } = await useFetch(
      `${runtimeConfig.public.products}/create`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        body: formData,
      },
    )

    if (error.value) {
      console.error(error.value.data.message)
      if (Array.isArray(error.value.data.message)) {
        for (const err of error.value.data.message) {
          if (err === 'brand should not be empty') {
            throw 'Veuillez choisir une marque de véhicule.'
          } else if (err === 'model should not be empty') {
            throw 'Veuillez entrer le modèle du véhicule.'
          } else if (err === 'vehicle_type should not be empty') {
            throw 'Veuillez choisir le type de véhicule.'
          } else if (err === 'price should not be empty') {
            throw 'Veuillez entrer un prix.'
          } else if (err === 'energy should not be empty') {
            throw "Veuillez choisir l'énergie du véhicule."
          } else if (err === 'transmission should not be empty') {
            throw 'Veuillez choisir le mode de transmission du véhicule.'
          }
        }
      } else {
        throw error.value.data.message
      }
    }

    await navigateTo('/products')
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function handleProductUpdateSubmit(data) {
  const runtimeConfig = useRuntimeConfig()

  try {
    const formData = new FormData()

    for (const [key, value] of Object.entries(data)) {
      if (key !== 'image') {
        formData.append(key, value)
      }
    }

    if (data.image) {
      formData.append('image', data.image)
    }

    const { data: product, error } = await useFetch(
      `${runtimeConfig.public.products}/update/${route.params.id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        body: formData,
      },
    )

    if (error.value) {
      console.error(error.value.data.message)
      if (Array.isArray(error.value.data.message)) {
        for (const err of error.value.data.message) {
          if (err === 'brand should not be empty') {
            throw 'Veuillez choisir une marque de véhicule.'
          } else if (err === 'model should not be empty') {
            throw 'Veuillez entrer le modèle du véhicule.'
          } else if (err === 'vehicle_type should not be empty') {
            throw 'Veuillez choisir le type de véhicule.'
          } else if (err === 'price should not be empty') {
            throw 'Veuillez entrer un prix.'
          } else if (err === 'energy should not be empty') {
            throw "Veuillez choisir l'énergie du véhicule."
          } else if (err === 'transmission should not be empty') {
            throw 'Veuillez choisir le mode de transmission du véhicule.'
          }
        }
      } else {
        throw error.value.data.message
      }
    }

    await navigateTo('/products')
  } catch (err) {
    console.error(err)
    throw err
  }
}
