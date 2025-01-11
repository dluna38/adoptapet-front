<template>
    <h1>Estas autenticado</h1>
</template>

<script setup>

definePageMeta({
    middleware: 'is-login'
})
</script>