<template>
  <div class="flex flex-col min-h-screen bg-orange-50">
    <main class="flex-grow">
      <div class="relative">
        <img :src="refugio.imagenPortada" :alt="'Portada de ' + refugio.nombre" class="w-full h-64 object-cover" />
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24"></div>
      </div>

      <div>
        <Tabs v-model:value="actualTab" lazy="true">
          <TabList :pt="{ activeBar: { class: 'bg-orange-500' } }"  id="main-content">
            <Tab value="0" class="text-orange-600">Inicio</Tab>
            <Tab value="1" class="text-orange-600">Animales</Tab>
            <Tab value="2" class="text-orange-600">Anuncios</Tab>
          </TabList>
          <TabPanels :pt="{root:'bg-orange-50'}">
            <TabPanel value="0">
              <div class="container mx-auto px-2 py-8">
                <div class="flex flex-col lg:flex-row lg:space-x-8">
                  <div class="lg:w-2/3">
                    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                      <div class="flex justify-between items-start mb-4">
                        <h1 class="text-3xl font-bold text-orange-800">{{ refugio.nombre }}</h1>
                        <div class="flex items-center">
                          <star-icon fill="#eab308" v-if="refugio.verificado" class="h-6 w-6 text-yellow-500 mr-1" />
                          <span v-if="refugio.verificado" class="text-sm text-yellow-600 font-medium">Verificado</span>
                        </div>
                      </div>
                      <p class="text-gray-600 mb-4">{{ refugio.descripcion }}</p>
                      <div class="flex items-center mb-2">
                        <map-pin-icon class="h-5 w-5 text-orange-500 mr-2" />
                        <span class="text-orange-600">{{ `${refugio.ubicacionMunicipio.nombre},
                          ${refugio.ubicacionMunicipio.departamento.nombre}` }}</span>
                      </div>
                      <div class="flex items-center mb-2">
                        <phone-icon class="h-5 w-5 text-orange-500 mr-2" />
                        <span class="text-orange-600">{{ refugio.telefono }}</span>
                      </div>
                      <div class="flex items-center">
                        <mail-icon class="h-5 w-5 text-orange-500 mr-2" />
                        <a :href="'mailto:' + refugio.correo" class="text-orange-600 hover:underline">{{ refugio.correo
                          }}</a>
                      </div>
                    </div>

                    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                      <div class="flex justify-between mb-5">
                        <h2 class="text-2xl font-bold text-orange-800 mb-1">Últimos animales en adopción</h2>
                        <button @click="changeTabToAnimales" class="bg-orange-500 text-black px-6 py-1 rounded-full hover:bg-orange-600 transition duration-300">Ver todos</button>
                      </div>
                      <div v-if="refugio?.animales?.length !== 0">
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <div v-for="(animal, index) in refugio.animales" :key="index">
                            <AnimalCard :animal="animal" />
                          </div>
                        </div>
                      </div>
                      <div v-else>
                        <p class="text-gray-600">No hay animales disponibles.</p>
                      </div>
                    </div>
                  </div>
                  <div class="lg:w-1/3">
                    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                      <h2 class="text-2xl font-bold text-orange-800 mb-4">Anuncios</h2>
                      <div v-if="refugio?.anuncios?.length !== 0">
                        <div v-for="anuncio in refugio.anuncios" :key="anuncio.id"
                          class="mb-4 pb-4 border-b border-orange-200 last:border-b-0">
                          <h3 class="text-lg font-semibold text-orange-700 mb-2">{{ anuncio.titulo }}</h3>
                          <p class="text-sm text-gray-600">{{ anuncio.contenido }}</p>
                        </div>
                      </div>
                      <div v-else>
                        <p class="text-gray-600">No hay anuncios disponibles.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="1">
              <AnimalList for-refugio="true"/>
            </TabPanel>
            <TabPanel value="2">
              <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                provident, similique sunt in culpa
                qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est
                et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MapPinIcon, StarIcon, PhoneIcon, MailIcon } from 'lucide-vue-next'
import { useAPI } from '~/composables/useApi';
import AnimalCard from '~/components/AnimalCard.vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

const refugio = ref({
  id: 1,
  nombre: 'Refugio Patitas Felices',
  descripcion: 'Somos un refugio dedicado al rescate y cuidado de animales abandonados. Nuestro objetivo es proporcionar un hogar temporal a perros y gatos mientras encontramos familias amorosas que los adopten. Trabajamos incansablemente para asegurar el bienestar de nuestros animales y educar a la comunidad sobre la tenencia responsable de mascotas.',
  verificado: true,
  ubicacion: 'Calle 123, Bogotá, Cundinamarca',
  telefono: '+57 301 234 5678',
  email: 'contacto@patitasfelices.com',
  imagenPortada: '/placeholder.svg?height=400&width=1200',
  animales: [
    { id: 1, nombre: 'Luna', descripcion: 'Perrita cariñosa, 2 años', imagen: '/placeholder.svg?height=200&width=200' },
    { id: 2, nombre: 'Max', descripcion: 'Gatito juguetón, 6 meses', imagen: '/placeholder.svg?height=200&width=200' },
    { id: 3, nombre: 'Rocky', descripcion: 'Perro adulto tranquilo, 5 años', imagen: '/placeholder.svg?height=200&width=200' },
    { id: 4, nombre: 'Mia', descripcion: 'Gata adulta, 3 años', imagen: '/placeholder.svg?height=200&width=200' },
    { id: 5, nombre: 'Toby', descripcion: 'Cachorro energético, 4 meses', imagen: '/placeholder.svg?height=200&width=200' },
    { id: 6, nombre: 'Nala', descripcion: 'Perrita mediana, 1 año', imagen: '/placeholder.svg?height=200&width=200' },
  ],
  anuncios: [
    { id: 1, titulo: 'Jornada de adopción', contenido: 'Este sábado, ven y conoce a nuestros adorables animales en busca de hogar.' },
    { id: 2, titulo: 'Necesitamos voluntarios', contenido: 'Si amas a los animales y tienes tiempo libre, únete a nuestro equipo de voluntarios.' },
    { id: 3, titulo: 'Campaña de esterilización', contenido: 'Próximamente estaremos realizando una campaña de esterilización a bajo costo.' },
  ]
})

const actualTab = ref('0');

await getInitialdata();

async function getInitialdata() {
  const { data, error } = await useAPI('/public/refugio/slug/' + useRoute().params.slugRefugio)

  console.log(data);
  if (error.value !== null) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found'
    })
  }

  refugio.value = data.value;
  return true;
}

useHead({
  title: 'Refugio: ' + refugio.value.nombre
})

const changeTabToAnimales = () => {
  actualTab.value = '1';
  document.getElementById("main-content").scrollIntoView({behavior: 'smooth'});
}

</script>

<style scoped>
.p-tab-active {
  color: #7C2D12;
}
</style>