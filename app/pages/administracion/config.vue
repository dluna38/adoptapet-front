<template>
    <div class="min-h-screen bg-orange-50 flex flex-col">

        <main class="flex-grow container mx-auto px-4 py-8 flex">
            <!-- Sidebar -->
            <aside class="w-64 bg-white shadow-md rounded-lg p-4 mr-8">
                <nav>
                    <ul class="space-y-2">
                        <li>
                            <button @click="activeSection = 'login'"
                                :class="['w-full text-left px-4 py-2 rounded-md', activeSection === 'login' ? 'bg-orange-100 text-orange-700' : 'text-gray-700 hover:bg-orange-50']">
                                Inicio de Sesión
                            </button>
                        </li>
                        <li>
                            <button @click="activeSection = 'contact'"
                                :class="['w-full text-left px-4 py-2 rounded-md', activeSection === 'contact' ? 'bg-orange-100 text-orange-700' : 'text-gray-700 hover:bg-orange-50']">
                                Contacto
                            </button>
                        </li>
                        <li>
                            <button @click="activeSection = 'social'"
                                :class="['w-full text-left px-4 py-2 rounded-md', activeSection === 'social' ? 'bg-orange-100 text-orange-700' : 'text-gray-700 hover:bg-orange-50']">
                                Social
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            <!-- Main content -->
            <div class="flex-grow bg-white shadow-md rounded-lg p-6">
                <h1 class="text-3xl font-bold text-orange-800 mb-8">Configuración del Refugio</h1>

                <form @submit.prevent="saveConfiguration">
                    <!-- Login Settings -->
                    <div v-if="activeSection === 'login'">
                        <h2 class="text-2xl font-semibold text-orange-700 mb-6">Configuración de Inicio de Sesión</h2>
                        <div class="space-y-4">
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo
                                    Electrónico</label>
                                <input type="email" id="email" v-model="config.email" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label for="currentPassword"
                                    class="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
                                <input type="password" id="currentPassword" v-model="config.currentPassword" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">Nueva
                                    Contraseña</label>
                                <input type="password" id="newPassword" v-model="config.newPassword"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label for="confirmPassword"
                                    class="block text-sm font-medium text-gray-700 mb-1">Confirmar Nueva
                                    Contraseña</label>
                                <input type="password" id="confirmPassword" v-model="config.confirmPassword"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                        </div>
                    </div>

                    <!-- Contact Information -->
                    <div v-if="activeSection === 'contact'">
                        <h2 class="text-2xl font-semibold text-orange-700 mb-6">Información de Contacto</h2>
                        <div class="space-y-4">
                            <div>
                                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                <input type="tel" id="phone" v-model="config.phone" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label for="address"
                                    class="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                                <input type="text" id="address" v-model="config.address" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label for="city" class="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                                <input type="text" id="city" v-model="config.city" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label for="state"
                                    class="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                                <input type="text" id="state" v-model="config.state" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label for="zipCode" class="block text-sm font-medium text-gray-700 mb-1">Código
                                    Postal</label>
                                <input type="text" id="zipCode" v-model="config.zipCode" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                        </div>
                    </div>

                    <!-- Social Information -->
                    <div v-if="activeSection === 'social'">
                        <h2 class="text-2xl font-semibold text-orange-700 mb-6">Información Social</h2>
                        <div class="space-y-4">
                            <div>
                                <label for="shelterName" class="block text-sm font-medium text-gray-700 mb-1">Nombre del
                                    Refugio</label>
                                <input type="text" id="shelterName" v-model="config.shelterName" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label for="shelterDescription"
                                    class="block text-sm font-medium text-gray-700 mb-1">Descripción del Refugio</label>
                                <textarea id="shelterDescription" v-model="config.shelterDescription" rows="4" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"></textarea>
                            </div>
                            <div>
                                <label for="website" class="block text-sm font-medium text-gray-700 mb-1">Sitio
                                    Web</label>
                                <input type="url" id="website" v-model="config.website"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label for="socialMedia" class="block text-sm font-medium text-gray-700 mb-1">Redes
                                    Sociales</label>
                                <input type="text" id="socialMedia" v-model="config.socialMedia"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex justify-end space-x-3 mt-6">
                        <button type="button" @click="resetForm"
                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                            Cancelar
                        </button>
                        <button type="submit"
                            class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </main>

    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

/*   
definePageMeta({
  layout: 'admin-layout'
}) */


const activeSection = ref('login')

const config = reactive({
    email: 'contacto@patitasfelices.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    phone: '+57 123 456 7890',
    address: 'Calle 123',
    city: 'Ciudad Ejemplo',
    state: 'Departamento Ejemplo',
    zipCode: '12345',
    shelterName: 'Refugio Patitas Felices',
    shelterDescription: 'Somos un refugio dedicado al cuidado y adopción de animales abandonados. Nuestro objetivo es encontrar hogares amorosos para todos nuestros residentes peludos.',
    website: 'https://www.patitasfelices.com',
    socialMedia: '@patitasfelices'
})

const saveConfiguration = () => {
    if (config.newPassword && config.newPassword !== config.confirmPassword) {
        alert('Las contraseñas nuevas no coinciden. Por favor, inténtalo de nuevo.')
        return
    }

    // Aquí iría la lógica para guardar la configuración en el backend
    console.log('Configuración guardada:', config)
    alert('Configuración guardada exitosamente')
}

const resetForm = () => {
    // Restablecer los valores del formulario a los originales
    Object.assign(config, {
        email: 'contacto@patitasfelices.com',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        phone: '+57 123 456 7890',
        address: 'Calle 123',
        city: 'Ciudad Ejemplo',
        state: 'Departamento Ejemplo',
        zipCode: '12345',
        shelterName: 'Refugio Patitas Felices',
        shelterDescription: 'Somos un refugio dedicado al cuidado y adopción de animales abandonados. Nuestro objetivo es encontrar hogares amorosos para todos nuestros residentes peludos.',
        website: 'https://www.patitasfelices.com',
        socialMedia: '@patitasfelices'
    })
}
</script>