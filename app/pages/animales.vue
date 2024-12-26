<template>
  <div class="flex flex-col min-h-screen bg-orange-50">

    <main class="flex-grow container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-orange-800 mb-8 text-center">Animales en Adopción</h1>

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
        <div>
          <label for="especie" class="block text-sm font-medium text-orange-700 mb-1">especie de animal</label>
          <select id="especie" v-model="filtros.especie"
            class="w-full p-2 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500">
            <option value="">Todos</option>
            <option value="perro">Perros</option>
            <option value="gato">Gatos</option>
          </select>
        </div>
      </div>

      <div v-if="animales?.length !== 0" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8" >
          <animal-card v-for="animal in animales" :key="animal.id" :animal="animal" :abrirModal="abrirModal" />
      </div>
      <div v-else>
          <p class="text-gray-600 text-center">No hay animales disponibles.</p>
        </div>
    </main>

    <animal-detail-modal :animalSeleccionado="animalSeleccionado" @cerrarModal="cerrarModal"
      :modalAbierto="modalAbierto" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

useHead({
  title: 'Animales'
})
const filtros = ref({
  page: 0,
  departamento: '',
  mun: '',
  especie: ''
})
const animales = ref([]);
const modalAbierto = ref(false)
const animalSeleccionado = ref(null)

await cargarAnimales();

async function cargarAnimales() {

  const { data, error } = await useAPI('/public/animal', { query: filtros.value })
  if (error.value !== null) {
    alert('Error al cargar los animales')
    return
  }
  animales.value = data.value.contenido;
}


const cargarMunicipios = () => {
  filtros.value.municipio = ''
}

const abrirModal = (animal) => {
  console.log(animal);

  animalSeleccionado.value = animal
  modalAbierto.value = true
}

const cerrarModal = () => {
  modalAbierto.value = false
  animalSeleccionado.value = null
}
</script>