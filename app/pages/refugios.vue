<template>
  <div class="flex flex-col min-h-screen bg-orange-50">

    <main class="flex-grow container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-orange-800 mb-8 text-center">Refugios inscritos</h1>

      <div class="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label for="departamento" class="block text-sm font-medium text-orange-700 mb-1">Departamento</label>
          <select id="departamento" v-model="filtros.departamento" @change="cargarMunicipios"
            class="w-full p-2 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500">
            <option value="">Todos los departamentos</option>
            <option v-for="dep in departamentos" :key="dep" :value="dep">{{ dep }}</option>
          </select>
        </div>
        <div>
          <label for="municipio" class="block text-sm font-medium text-orange-700 mb-1">Municipio</label>
          <select id="municipio" v-model="filtros.mun"
            class="w-full p-2 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500">
            <option value="">Todos los municipios</option>
            <option v-for="mun in municipiosFiltrados" :key="mun" :value="mun">{{ mun }}</option>
          </select>
        </div>
      </div>

      <div v-if="refugios?.length !== 0" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8" >
        <NuxtLink v-for="(refugio,index) in refugios" :key="index" :to="`/refugio/${refugio.slug}`" no-prefetch="true" class="hover:scale-105 transition duration-300">
          <RefugioCard  :refugio="refugio"/>
        </NuxtLink>
      </div>
      <div v-else>
          <p class="text-gray-600 text-center">No hay refugios disponibles.</p>
        </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

useHead({
  title: 'Refugios'
})
const filtros = ref({
  page: 0,
  departamento: '',
  mun: '',
})
const refugios = ref([]);
const modalAbierto = ref(false)
const animalSeleccionado = ref(null)

await cargarRefugios();

async function cargarRefugios() {
  const { data, error } = await useAPI('/public/refugio', { query: filtros.value })
  console.log(data)
  if (error.value !== null) {
    console.log('Error al cargar los animales')
    return
  }
  refugios.value = data.value.contenido;
}


const cargarMunicipios = () => {
  filtros.value.municipio = ''
}
</script>