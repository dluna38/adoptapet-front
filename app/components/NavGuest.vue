<script setup>
import { PawPrintIcon } from 'lucide-vue-next';
</script>

<template>
    <header class="bg-orange-100 p-4">
        <nav class="container mx-auto flex justify-between items-center">
          <NuxtLink to="/" class="flex items-center text-orange-700 text-2xl font-bold">
            <PawPrintIcon  class="h-8 w-8 mr-2"/>
            PetAdopt
          </NuxtLink>
          <ul class="flex space-x-4">
            <li><NuxtLink to="/" class="text-orange-700 hover:text-orange-900" active-class="text-orange-900">Inicio</NuxtLink> </li>
            <li><a href="#refugios" class="text-orange-700 hover:text-orange-900">Refugios</a></li>
            <li><NuxtLink to="/animales" class="text-orange-700 hover:text-orange-900" active-class="text-orange-900">Animales</NuxtLink> </li>
            <li><a href="#como-ayudar" class="text-orange-700 hover:text-orange-900">Cómo Ayudar</a></li>
            <li><a href="#contacto" class="text-orange-700 hover:text-orange-900">Contacto</a></li>
          </ul>
        </nav>
      </header>
</template>