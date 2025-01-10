export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtApp
    const api = $fetch.create({
        baseURL: 'http://localhost:8080/api',
        onRequest({ request, options }) {
          if (localStorage.getItem('token')) {
            options.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
          }
        },
        async onResponseError({ response }) {
          if (response.status === 401 || response.status === 403) {
            localStorage.clear();
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