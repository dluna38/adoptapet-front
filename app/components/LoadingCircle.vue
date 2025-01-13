<template>
    <LoaderCircle class="rotating-icon" color="#ea580c" v-show="loading"/>
</template>

<script setup>
import { LoaderCircle } from 'lucide-vue-next';
defineProps({
    loading: {
        type: Boolean,
        default: false
    },
})

</script>

<style scoped>
.rotating-icon {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>