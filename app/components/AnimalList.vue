<template>
    <main class="flex-grow container mx-auto px-4 py-4">
        <h1 v-if="!props.forRefugio" class="text-3xl font-bold text-orange-800 mb-8 text-center">Animales en adopción
        </h1>

        <div class="mb-2 grid grid-cols-1 md:grid-cols-3 gap-4" id="filtros">
            <div v-if="!props.forRefugio">
                <label for="departamento" class="block text-sm font-medium text-orange-700 mb-1">Departamento</label>
                <select id="departamento" v-model="filtros.departamento" @change="changeMunicipios"
                    class="w-full p-2 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500">
                    <option value="">Todos los departamentos</option>
                    <option v-for="dep in departamentos" :key="dep.id" :value="dep.id">{{ dep.nombre }}</option>
                </select>
            </div>
            <div v-if="!props.forRefugio">
                <label for="municipio" class="block text-sm font-medium text-orange-700 mb-1">Municipio</label>
                <select id="municipio" v-model="filtros.mun"
                    class="w-full p-2 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500">
                    <option value="">Todos los municipios</option>
                    <option v-for="mun in municipios[filtros.departamento]" :key="mun.id" :value="mun.id">{{ mun.nombre
                        }}</option>
                </select>
            </div>
            <div>
                <label for="especie" class="block text-sm font-medium text-orange-700 mb-1">Especie de animal</label>
                <select id="especie" v-model="filtros.especie"
                    class="w-full p-2 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500">
                    <option value="">Todos</option>
                    <option value="2">Perros</option>
                    <option value="1">Gatos</option>
                </select>
            </div>
        </div>
        <div class="mb-8 space-x-2">
            <button @click="cargarAnimales"
                class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300">Buscar</button>
            <button @click="limpiarFiltros"
                class="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300">Limpiar filtro</button>
        </div>
        <CatLoader :loading="animalsLoading" :black-cover="false"/>
        <div v-if="animales?.length !== 0">
            <div class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))]  gap-4">
                <animal-card v-for="animal in animales" :key="animal.id" :animal="animal" :abrirModal="abrirModal" />
            </div>
            <div class="mt-4">
                <Paginator :rows="page.tamano" :total-records="page.totalElements" @page="changePage"/>
            </div>
        </div>
        <div v-else>
            <p class="text-gray-600 text-center">No hay animales disponibles.</p>
        </div>
    </main>
    
    <animal-detail-modal :animalSeleccionado="animalSeleccionado" @cerrarModal="cerrarModal"
        :modalAbierto="modalAbierto" />
</template>

<script setup>
import { ref, computed } from 'vue'
import Paginator from 'primevue/paginator';
import Button from 'primevue/button';
import CatLoader from './CatLoader.vue';

const animalsLoading  = ref(false);

const props = defineProps({
    forRefugio: {
        type: Boolean,
        default: false,
        optional: true
    },
})
const page = ref({
    actualPage: 0,
    totalPages: 0,
    tamano: 0,
    totalElements:0
})

const filtros = ref({
    page: 0,
    departamento: '',
    mun: '',
    especie: ''
})
const animales = ref([]);
const modalAbierto = ref(false)
const animalSeleccionado = ref(null)

await Promise.all([cargarAnimales(), fetchDepartamentos()])
const departamentos = useDepartamentos();
const municipios = useMunicipios();

async function cargarAnimales() {
    if (props.forRefugio) {
        console.log("para refugio");
        filtros.value.refugio = useRoute().params.slugRefugio
    }
    animalsLoading.value = true;
    const { data, error } = await useAPI('/public/animal', { query: filtros.value })
    animalsLoading.value = false;
    console.log(data);

    if (error.value !== null) {
        console.error('Error al cargar los animales', error.value)
        return
    }
    animales.value = data.value.contenido;
    page.value.actualPage = data.value.paginaActual;
    page.value.totalPages = data.value.paginasTotales;
    page.value.tamano = data.value.tamano;
    page.value.totalElements = data.value.totalElements;
}


const changeMunicipios = async () => {
    //TODO PUT LOADER HERE
    await fetchMunicipios(filtros.value.departamento);
}

function changePage(pageInfo) {
    filtros.value.page = pageInfo.page;
    console.log(pageInfo);
    cargarAnimales();
}

const abrirModal = (animal) => {
    console.log(animal);

    animalSeleccionado.value = animal
    modalAbierto.value = true
}

const cerrarModal = () => {
    modalAbierto.value = false
    animalSeleccionado.value = null
}

function limpiarFiltros(params) {
    filtros.value = {
        page: 0,
        departamento: '',
        mun: '',
        especie: ''
    }
    cargarAnimales();
}
</script>

<style scoped>
.p-paginator-page-selected {
    color: black !important;
}
</style>