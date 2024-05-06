export async function login(credentials) {
  try {
    const runtimeConfig = useRuntimeConfig()
    const response = await fetch(`${runtimeConfig.public.auth}/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.status === 401) {
      throw 'Identifiants invalides'
    }

    const data = await response.json()
    if (data.token) {
      localStorage.setItem('jwt', data.token)
      await navigateTo('/dashboard')
    }
  } catch (error) {
    throw error
  }
}

export async function logout() {
  try {
    await localStorage.removeItem('jwt')
  } catch (error) {
    console.error(error)
  }
}
