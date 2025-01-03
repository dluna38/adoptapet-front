<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
        <HomeIcon class="h-12 w-12 text-amber-500 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-amber-700 text-center mb-2">{{ refugio.nombreRefugio }}</h3>
        <p class="text-gray-600 text-center mb-4 line-clamp-3">{{ refugio.descripcion }}</p>
        <p class="text-amber-600 text-center">
            <MapPinIcon class="h-5 w-5 inline-block mr-1" />
            {{ refugio.municipio.nombre +", "+refugio.municipio.departamento.nombre }}
        </p>
    </div>
</template>
<script setup>
import { HomeIcon, MapPinIcon } from 'lucide-vue-next';

defineProps(['refugio']);


</script>