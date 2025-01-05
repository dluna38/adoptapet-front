<template>
    <main class="flex-grow container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-orange-800 mb-8 text-center">{{ `Animales en adopción${props.forRefugio ? ' de ' : ''}` }}</h1>

        <div class="mb-2 grid grid-cols-1 md:grid-cols-3 gap-4">     
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
            </div >
            <div >
                <label for="especie" class="block text-sm font-medium text-orange-700 mb-1">Especie de animal</label>
                <select id="especie" v-model="filtros.especie"
                    class="w-full p-2 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500">
                    <option value="">Todos</option>
                    <option value="perro">Perros</option>
                    <option value="gato">Gatos</option>
                </select>
            </div>
        </div>
        <div class="mb-8">
            <button @click="cargarAnimales" class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300">Buscar</button>
        </div>
        <div v-if="animales?.length !== 0" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <animal-card v-for="animal in animales" :key="animal.id" :animal="animal" :abrirModal="abrirModal" />
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

const props = defineProps({
    forRefugio: {
        type: Boolean,
        default: false,
        optional: true
    },
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


/* await .then(([animales, departamentos]) => {
  departamentos.value = departamentos.data
}) */
//TODO poner loading al cambiar de departamentos 
await Promise.all([cargarAnimales(), fetchDepartamentos()])
await fetchDepartamentos();
const departamentos = useDepartamentos();
const municipios = useMunicipios();

async function cargarAnimales() {
    if (props.forRefugio) {
        console.log("para refugio");
        filtros.value.refugio = useRoute().params.slugRefugio
    }
    const { data, error } = await useAPI('/public/animal', { query: filtros.value })
    console.log(data);
    
    if (error.value !== null) {
        console.error('Error al cargar los animales', error.value)
        return
    }
    animales.value = data.value.contenido;
}


const changeMunicipios = async () => {
    await fetchMunicipios(filtros.value.departamento);
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
</script>