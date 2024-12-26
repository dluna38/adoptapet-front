<script setup lang="ts">
import FooterGuest from '~/components/FooterGuest.vue';
import NavGuest from '~/components/NavGuest.vue';
</script>

<template>
    <NavGuest/>
    <slot/>
    <FooterGuest/>
</template>