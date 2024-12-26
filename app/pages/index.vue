<template>
  <div class="flex flex-col min-h-screen">
    <main>
      <section class="bg-orange-200 py-20">
        <div class="container mx-auto text-center">
          <h1 class="text-4xl font-bold text-orange-800 mb-4">Encuentra a tu compañero perfecto</h1>
          <p class="text-xl text-orange-700 mb-8">Adopta una mascota y cambia dos vidas: la suya y la tuya.</p>
          <div class="space-x-4">
            <NuxtLink to="/animales" class="bg-orange-500 text-black px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300">
              Adoptar ahora
            </NuxtLink>
            <button class="bg-white text-black-500 px-6 py-2 rounded-full hover:bg-orange-100 transition duration-300">
              Conoce más
            </button>
          </div>
        </div>
      </section>

      <section id="refugios" class="py-16 bg-amber-50">
        <div class="container mx-auto">
          <h2 class="text-3xl font-bold text-amber-800 text-center mb-12">Nuestros Refugios</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="refugio in refugios" :key="refugio.id" class="bg-white p-6 rounded-lg shadow-md">
              <home-icon class="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 class="text-xl font-semibold text-amber-700 text-center mb-2">{{ refugio.nombre }}</h3>
              <p class="text-gray-600 text-center mb-4">{{ refugio.descripcion }}</p>
              <p class="text-amber-600 text-center">
                <map-pin-icon class="h-5 w-5 inline-block mr-1" />
                {{ refugio.ubicacion }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="animales" class="py-16 bg-orange-100">
        <div class="container mx-auto">
          <h2 class="text-3xl font-bold text-orange-800 text-center mb-12">Animales en Adopción</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="animal in animales" :key="animal.id" class="bg-white p-6 rounded-lg shadow-md">
              <div class="bg-orange-200 h-48 rounded-md mb-4"></div>
              <h3 class="text-xl font-semibold text-orange-700 mb-2">{{ animal.nombre }}</h3>
              <p class="text-gray-600 mb-4">{{ animal.descripcion }}</p>
              <button
                class="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition duration-300">
                Conocer más
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="como-ayudar" class="py-16 bg-yellow-50">
        <div class="container mx-auto">
          <h2 class="text-3xl font-bold text-yellow-800 text-center mb-12">Cómo Puedes Ayudar</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <heart-icon class="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h3 class="text-xl font-semibold text-yellow-700 mb-2">Adopta</h3>
              <p class="text-gray-600">Dale un hogar a una mascota necesitada y cambia su vida para siempre.</p>
            </div>
            <div class="text-center">
              <users-icon class="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h3 class="text-xl font-semibold text-yellow-700 mb-2">Voluntariado</h3>
              <p class="text-gray-600">Ofrece tu tiempo y cariño a los animales en nuestros refugios.</p>
            </div>
            <div class="text-center">
              <help-circle-icon class="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h3 class="text-xl font-semibold text-yellow-700 mb-2">Dona</h3>
              <p class="text-gray-600">Apoya nuestra misión con donaciones que ayudan a cuidar a los animales.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" class="py-16 bg-amber-100">
        <div class="container mx-auto max-w-md">
          <h2 class="text-3xl font-bold text-amber-800 text-center mb-8">Contáctanos</h2>
          <form @submit.prevent="enviarFormulario" class="space-y-4">
            <div>
              <label for="nombre" class="block text-amber-700 mb-1">Nombre</label>
              <input type="text" id="nombre" v-model="formulario.nombre" required
                class="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
            </div>
            <div>
              <label for="email" class="block text-amber-700 mb-1">Email</label>
              <input type="email" id="email" v-model="formulario.email" required
                class="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
            </div>
            <div>
              <label for="mensaje" class="block text-amber-700 mb-1">Mensaje</label>
              <textarea id="mensaje" v-model="formulario.mensaje" required rows="4"
                class="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"></textarea>
            </div>
            <button type="submit"
              class="w-full bg-amber-500 text-white py-2 rounded-full hover:bg-amber-600 transition duration-300">
              Enviar mensaje
            </button>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { HomeIcon, MapPinIcon, HeartIcon, UsersIcon, HelpCircleIcon } from 'lucide-vue-next'

useHead({
  title:'Inicio'
})

const refugios = ref([
  { id: 1, nombre: 'Refugio Patitas Felices', descripcion: 'Un hogar temporal lleno de amor para nuestros amigos peludos.', ubicacion: 'Madrid, España' },
  { id: 2, nombre: 'Santuario Animal', descripcion: 'Dedicados a rescatar y cuidar animales en situación de calle.', ubicacion: 'Barcelona, España' },
  { id: 3, nombre: 'Hogar de Esperanza', descripcion: 'Brindamos una segunda oportunidad a mascotas abandonadas.', ubicacion: 'Valencia, España' },
])

const animales = ref([
  { id: 1, nombre: 'Luna', descripcion: 'Perrita cariñosa y juguetona en busca de un hogar amoroso.' },
  { id: 2, nombre: 'Simba', descripcion: 'Gato adulto tranquilo, perfecto para un hogar relajado.' },
  { id: 3, nombre: 'Rocky', descripcion: 'Perro joven lleno de energía, ideal para familias activas.' },
  { id: 4, nombre: 'Mia', descripcion: 'Gatita dulce y tímida que necesita un hogar paciente.' },
  { id: 5, nombre: 'Max', descripcion: 'Perro mayor que busca un hogar tranquilo para su retiro.' },
  { id: 6, nombre: 'Nala', descripcion: 'Perrita mediana, cariñosa y buena con los niños.' },
])

const formulario = ref({
  nombre: '',
  email: '',
  mensaje: ''
})

const enviarFormulario = () => {
  // Aquí iría la lógica para enviar el formulario
  console.log('Formulario enviado:', formulario.value)
  // Resetear el formulario después de enviar
  formulario.value = { nombre: '', email: '', mensaje: '' }
}
</script>