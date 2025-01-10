<script setup lang="ts">
import NavAdmin from '~/components/NavAdmin.vue';
import FooterGuest from '~/components/FooterGuest.vue';
</script>

<template>
   <div>
      <NavAdmin />
      <slot />
      <FooterGuest />
   </div>
</template>