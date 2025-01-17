<template>
    <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden ">
        <img :src="getAnimalImage(animal.fotoPortada?.img)" :alt="'foto de '+animal.nombre" class="w-full h-48 object-contain" />
        <div class="px-6 pt-4 pb-2">
            <h2 class="text-xl font-semibold text-orange-700 mb-2">{{ animal.nombre }}</h2>
            <p class="text-gray-600 mb-4 line-clamp-2">{{ animal.descripcion }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
                <span class="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {{ animal.raza.especie.nombre }}
                </span>
                <span class="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {{ getMonthsOrYearsFromNow(animal.fechaNacimiento) }}
                </span>
                <span class="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {{ animal.sexo }}
                </span>
                <span class="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {{ animal.raza.nombre }}
                </span>
            </div>
            <div class="flex items-center mb-2">
                <home-icon class="h-5 w-5 text-orange-500 mr-2" />
                <span class="text-sm text-orange-600 line-clamp-1">{{ animal.refugio.nombreRefugio }}</span>
            </div>
            <div class="flex items-center mb-4">
                <map-pin-icon class="h-5 w-5 text-orange-500 mr-2" />
                <span class="text-sm text-orange-600 line-clamp-1">{{ animal.refugio.municipio.nombre +", "+animal.refugio.municipio.departamento.nombre }}</span>
            </div>
            <button @click="abrirModal(animal)"
                class="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition duration-300">
                Conocer más
            </button>
        </div>
    </div>
</template>
<script setup>
import { MapPinIcon, HomeIcon } from 'lucide-vue-next'

defineProps({
    animal: Object,
    abrirModal: Function
})



</script>