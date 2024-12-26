<template>
<div v-if="modalAbierto" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-3xl font-bold text-orange-800">{{ animalSeleccionado.nombre }}</h2>
            <button @click="$emit('cerrarModal')" class="text-gray-500 hover:text-gray-700">
              <x-icon class="h-6 w-6" />
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img :src="getAnimalImage(animalSeleccionado.fotoPortada.img)" :alt="'foto de '+animalSeleccionado.nombre"
                class="w-full h-64 object-cover rounded-lg mb-4" />
              <div class="grid grid-cols-3 gap-2">
                <img v-for="(imagen, index) in animalSeleccionado.imagenesAdicionales" :key="index" :src="imagen"
                  :alt="`Imagen adicional de ${animalSeleccionado.nombre}`"
                  class="w-full h-20 object-cover rounded-lg" />
              </div>
            </div>
            <div>
              <p class="text-gray-600 mb-4">{{ animalSeleccionado.descripcion }}</p>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 class="font-semibold text-orange-700">Especie</h3>
                  <p>{{ animalSeleccionado.raza.especie.nombre }}</p>
                </div>
                <div>
                  <h3 class="font-semibold text-orange-700">Edad</h3>
                  <p>{{ getMonthsOrYearsFromNow(animalSeleccionado.fechaNacimiento) }}</p>
                </div>
                <div>
                  <h3 class="font-semibold text-orange-700">Sexo</h3>
                  <p>{{ animalSeleccionado.sexo }}</p>
                </div>
                <div>
                  <h3 class="font-semibold text-orange-700">Raza</h3>
                  <p>{{ animalSeleccionado.raza.nombre  }}</p>
                </div>
              </div>
              <div class="mb-4">
                <h3 class="font-semibold text-orange-700">Refugio</h3>
                  <nuxt-link :to="`/refugio/${animalSeleccionado.refugio.slug}`" target="_blank" class="underline flex items-center">
                  {{ animalSeleccionado.refugio.nombreRefugio }}
                  <span><ExternalLink size="16" class="align-middle ml-1"/></span>
                </nuxt-link>
              </div>
              <div class="mb-4">
                <h3 class="font-semibold text-orange-700">Ubicación</h3>
                <p>{{  animalSeleccionado.refugio.municipio.nombre +", "+animalSeleccionado.refugio.municipio.departamento.nombre }}</p>
              </div>
              <button
                class="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition duration-300">
                Solicitar adopción
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ExternalLink, XIcon } from 'lucide-vue-next'

defineProps({
    animalSeleccionado: Object,
    modalAbierto: Boolean,
})


defineEmits(['cerrarModal'])
/*
document.body.addEventListener("Escape", (e) => {
  if (!e.repeat) {
    logMessage(`Key "${e.key}" pressed [event: keydown]`);
  } else {
    logMessage(`Key "${e.key}" repeating [event: keydown]`);
  }
});
*/
</script>