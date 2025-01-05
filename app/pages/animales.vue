<template>
  <div class="flex flex-col min-h-screen bg-orange-50">
    <AnimalList/>
  </div>
</template>

<script setup>
import AnimalList from '~/components/AnimalList.vue';

useHead({
  title: 'Animales'
})

</script>