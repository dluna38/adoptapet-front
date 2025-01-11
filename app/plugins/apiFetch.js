export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtApp

    const token = useCookie('token');

    const api = $fetch.create({
        baseURL: 'http://localhost:8080/api',
        onRequest({ request, options }) {
          if (token.value) {
            options.headers.set('Authorization', `Bearer ${token.value}`)
          }
        },
        async onResponseError({ response }) {
          if (response.status === 401 || response.status === 403) {
            token.value = null
            await nuxtApp.runWithContext(() => navigateTo('/login'))
          }
        }
      })
    
      // Expose to useNuxtApp().$api
      return {
        provide: {
          api
        }
      }
  })