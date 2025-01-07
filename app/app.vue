<script setup>
useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: '%s - AdoptaPet',
  htmlAttrs:{
    lang: 'es',
    class: 'light'
  }
})
</script>


<template>
  <div>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</div>
</template>
