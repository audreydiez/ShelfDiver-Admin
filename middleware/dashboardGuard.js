export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === '/dashboard') {
    const runtimeConfig = useRuntimeConfig()

    //Fetches the jwt in local storage
    let jwt = null
    if (typeof localStorage !== 'undefined') {
      jwt = localStorage.getItem('jwt')
      console.log(jwt)
    }

    // If there's no jwt in LS, redirect to the login page.
    if (!jwt) {
      return navigateTo('/login')
    }

    try {
      // Asks to the back-end API if the provided jwt is valid or not
      const response = await fetch(`${runtimeConfig.public.profile}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      })
      console.log(response.status)

      // Redirects to the login page if the provided jwt isn't validated by the back-end side.
      if (response.status === 401) {
        return navigateTo('/login')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      return navigateTo('/login')
    }
  }
})
