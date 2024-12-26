export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtApp
    const api = $fetch.create({
        baseURL: 'http://localhost:8080/api',
      })
    
      // Expose to useNuxtApp().$api
      return {
        provide: {
          api
        }
      }
  })