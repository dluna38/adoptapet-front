<template>
  <div class="min-h-screen bg-orange-50 flex flex-col">

    <main class="flex-grow container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-orange-800 mb-8 text-center">Panel de Administración</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <nuxt-link to="/administracion/animales"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
          <dog-icon class="h-16 w-16 mx-auto mb-4 text-orange-500" />
          <h2 class="text-xl font-semibold text-orange-700 mb-2">Todos los Animales</h2>
          <p class="text-gray-600">Gestiona todos los animales en tu refugio</p>
        </nuxt-link>

        <button @click="navigateTo('animales-publicados')"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
          <clipboard-list-icon class="h-16 w-16 mx-auto mb-4 text-orange-500" />
          <h2 class="text-xl font-semibold text-orange-700 mb-2">Animales Publicados</h2>
          <p class="text-gray-600">Revisa y edita los animales disponibles para adopción</p>
        </button>

        <button @click="navigateTo('configuracion')"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
          <settings-icon class="h-16 w-16 mx-auto mb-4 text-orange-500" />
          <h2 class="text-xl font-semibold text-orange-700 mb-2">Configuración</h2>
          <p class="text-gray-600">Ajusta la configuración de tu cuenta y refugio</p>
        </button>
      </div>

      <div class="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-orange-700 mb-4">Resumen del Refugio</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-orange-100 p-4 rounded-lg">
            <h3 class="text-lg font-medium text-orange-800 mb-2">Total de Animales</h3>
            <p class="text-3xl font-bold text-orange-600">{{ totalAnimals }}</p>
          </div>
          <div class="bg-orange-100 p-4 rounded-lg">
            <h3 class="text-lg font-medium text-orange-800 mb-2">Animales Publicados</h3>
            <p class="text-3xl font-bold text-orange-600">{{ publishedAnimals }}</p>
          </div>
          <div class="bg-orange-100 p-4 rounded-lg">
            <h3 class="text-lg font-medium text-orange-800 mb-2">Adopciones Pendientes</h3>
            <p class="text-3xl font-bold text-orange-600">{{ pendingAdoptions }}</p>
          </div>
        </div>
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DogIcon, ClipboardListIcon, SettingsIcon, MSquare } from 'lucide-vue-next'

useHead({
  title: 'Administración'
})
/* 
definePageMeta({
  title: 'Administración',
  description: 'Panel de administración de AdoptaPet',
  layout: 'admin-layout'
}) */

const totalAnimals = ref(45)
const publishedAnimals = ref(32)
const pendingAdoptions = ref(5)

const navigateTo = (module) => {
  console.log(`Navegando a: ${module}`)
  // Aquí iría la lógica de navegación, por ejemplo:
  // router.push(`/admin/${module}`)
}

const logout = () => {
  console.log('Cerrando sesión...')
  // Aquí iría la lógica para cerrar sesión
}
</script>