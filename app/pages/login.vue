<template>
    <div class="min-h-screen bg-orange-50 flex flex-col">

        <main class="flex-grow container mx-auto px-4 py-8">
            <div class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div class="p-6">
                    <h2 class="text-2xl font-bold text-orange-800 mb-6 text-center">
                        {{ isLogin ? 'Iniciar Sesión' : 'Registrarse' }}
                    </h2>
                    <form @submit.prevent="handleSubmit">
                        <div class="mb-4" v-if="!isLogin">
                            <label for="refugioName" class="block text-sm font-medium text-gray-700 mb-1">
                                Nombre del Refugio
                            </label>
                            <input type="text" id="refugioName" v-model="form.refugioName"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-300 focus:border-orange-300"
                                required />
                        </div>
                        <div class="mb-4">
                            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                                Correo Electrónico
                            </label>
                            <input type="email" id="email" v-model="form.email"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-300 focus:border-orange-300"
                                required autocomplete="email"/>
                        </div>
                        <div class="mb-4">
                            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                                Contraseña
                            </label>
                            <input type="password" id="password" v-model="form.password"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-300 focus:border-orange-300"
                                required autocomplete="current-password"/>
                        </div>
                        <div v-if="errorLogin" class="mb-6 text-center">
                            <small class="text-red-500">Credenciales incorrectas</small>
                        </div>
                        <button type="submit"
                            class="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50 transition duration-300">
                            {{ isLogin ? 'Iniciar Sesión' : 'Registrarse' }}
                        </button>
                    </form>
                    <div class="mt-4 text-center">
                        <button @click="toggleForm" class="text-orange-600 hover:text-orange-800">
                            {{ isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión' }}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <CatLoader :loading="loading" />
</template>

<script setup>
import { ref, reactive } from 'vue'
import CatLoader from '~/components/CatLoader.vue';


useHead({
    title: 'Iniciar Sesión',
    meta: [
        {
            name: 'description',
            content: 'Inicia sesión o regístrate en PetAdopt para ayudar a los animales sin hogar.'
        }
    ]
})
const tokenCookie = useCookie('token')

if (tokenCookie.value) {
    navigateTo('/administracion')
}

const isLogin = ref(true)
const errorLogin = ref(false);
const loading = ref(false);

const form = reactive({
    refugioName: '',
    email: '',
    password: ''
})
const toggleForm = () => {
    isLogin.value = !isLogin.value
    form.refugioName = ''
    form.email = ''
    form.password = ''
}

const handleSubmit = async () => {
    loading.value = true;

    if (isLogin.value) {
        console.log('Iniciando sesión con:', form.email)
         const response = await useAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                correo: form.email,
                contrasena: form.password
            })
        })

        if(response.status.value === "error"){
            console.log('Error al iniciar sesión:')
            console.log(response.error.value.data);
            errorLogin.value = true
            loading.value = false;
            return
        }
        console.log('Sesión iniciada:', response.data.value)
        tokenCookie.value = response.data.value.token;
        navigateTo('/administracion');
        loading.value = false;
    } else {
        console.log('Registrando nuevo refugio:', form.refugioName, form.email)
        // Aquí iría la lógica para registrar un nuevo refugio
    }
}
</script>