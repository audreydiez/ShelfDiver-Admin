export async function login(credentials) {
  try {
    const runtimeConfig = useRuntimeConfig()
    const response = await fetch(`${runtimeConfig.public.login}`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    if (data.token) {
      localStorage.setItem('jwt', data.token)
      await navigateTo('/dashboard')
    }
  } catch (error) {
    console.error('Error logging in:', error)
  }
}

export async function logout() {
  try {
    await localStorage.removeItem('jwt')
  } catch (error) {
    console.error(error)
  }
}
