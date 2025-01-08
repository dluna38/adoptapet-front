<template>
    <div v-show="loading" class="modal-mask fixed flex items-center justify-center top-0 left-0 w-full h-full" :class="{' bg-black bg-opacity-50' : blackCover} ">
        <div class="loader">
            <video autoplay loop muted playsinline>
                <source src="/resources/cat-loader.webm" type="video/webm">
                Loading
            </video>
        </div>
    </div>
</template>
<script setup>
//take from https://lottiefiles.com/free-animation/pet-loading-uByKqYNqcE
defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    blackCover: {
        type: Boolean,
        default: true
    }
})
</script>

<style>
/* modal style */

.modal-masks {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>