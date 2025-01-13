<template>
    <div class="min-h-screen bg-orange-50 flex flex-col">
        <main class="flex-grow container mx-auto px-2 py-8">
            <h1 class="text-3xl font-bold text-orange-800 mb-8">Todos mis animales</h1>

            <div class="mb-6 flex justify-between items-center">
                <div class="relative">
                    <input type="text" v-model="searchTerm" placeholder="Buscar animales..."
                        class="pl-10 pr-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    <search-icon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-5 w-5" />
                </div>
                <button @click="navigateTo('/administracion/animales/nuevo')"
                    class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 flex items-center">
                    <plus-icon class="h-5 w-5 mr-2" />
                    Agregar Nuevo Animal
                </button>
            </div>

            <div class="bg-white rounded-lg shadow-md overflow-hidden overflow-x-auto">
                <data-table v-if="animales?.length !== 0" :value="animales" tableStyle="min-width: 50rem" paginator  :rows="page.tamano" :total-records="page.totalElements" @page="changePage">
                    <column field="nombre" header="Nombre"></column>
                    <column field="raza.especie.nombre" header="Especie"></column>
                    <column field="raza.nombre" header="Raza"></column>
                    <column header="Edad">
                        <template #body="slotProps">
                            {{ getMonthsOrYearsFromNow(slotProps.data.fechaNacimiento) }}
                        </template>
                    </column>
                    <column field="color" header="Color"></column>
                    <column field="tamano" header="Tamaño"></column>
                    <column header="Publicado">
                        <template #body="slotProps">
                            <span :class="[
                                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                    slotProps.data.habilitadoAdopcion ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                ]">
                                    {{ slotProps.data.habilitadoAdopcion ? 'Sí' : 'No' }}
                                    </span>
                        </template>
                    </column>
                    <column  header="Acciones">
                        <template #body="slotProps">
                            <button @click="viewDetails(slotProps.data)"
                                    class="text-orange-600 hover:text-orange-900 mr-3 rounded-md" v-tooltip.top="'Ver detalles'">
                                    <Info />
                                </button>
                                <button @click="editAnimal(slotProps.data)"
                                    class="text-indigo-600 hover:text-indigo-900" v-tooltip.top="'Editar animal'"><FilePenLine /></button>
                        </template>
                    </column>
                </data-table>
                <div v-else>
                    <p class="text-gray-600 text-center">No se encontraron animales registrados</p>
                </div>
            </div>

            <div v-if="filteredAnimals.length === 0" class="text-center py-8">
                <p class="text-gray-600">No se encontraron animales que coincidan con la búsqueda.</p>
            </div>
        </main>

        <div v-if="showDetailModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-6">
                        <h2 class="text-3xl font-bold text-orange-800">Detalles del Animal</h2>
                        <button @click="closeDetailModal" class="text-gray-500 hover:text-gray-700">
                            <x-icon class="h-6 w-6" />
                        </button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="md:col-span-1">
                            <img :src="getAnimalImage(selectedAnimal.fotoPortada.img)" :alt="selectedAnimal.nombre"
                                class="w-full h-auto rounded-lg shadow-md" />
                        </div>
                        <div class="md:col-span-2">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Nombre</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.nombre }}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Especie</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.raza.especie.nombre }}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Raza</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.raza.nombre }}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Edad</h3>
                                    <p class="text-gray-600">{{ getMonthsOrYearsFromNow(selectedAnimal.fechaNacimiento) }}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Color</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.color }}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Tamaño</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.tamano }}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Publicado para Adopción</h3>
                                    <p :class="[
                                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                        selectedAnimal.habilitadoAdopcion ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    ]">
                                        {{ selectedAnimal.habilitadoAdopcion ? 'Sí' : 'No' }}
                                    </p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Esterilizado</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.historiaClinica.estaEsterilizado ? 'Sí' : 'No' }}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Vacunado</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.historiaClinica.estaVacunado ? 'Sí' : 'No' }}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Cuenta con chip</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.tieneChip ? 'Sí' : 'No' }}</p>
                                </div>
                            </div>
                            <div class="mt-4">
                                <h3 class="text-lg font-semibold text-gray-700">Comportamiento</h3>
                                <p class="text-gray-600">{{ selectedAnimal.historiaClinica.comportamiento }}</p>
                            </div>
                            <div class="mt-4">
                                <h3 class="text-lg font-semibold text-gray-700">Estado de Salud</h3>
                                <p class="text-gray-600">{{ selectedAnimal.historiaClinica.estadoGeneral }}</p>
                            </div>
                            <div v-if="selectedAnimal.historiaClinica.estaVacunado" class="mt-4">
                                <h3 class="text-lg font-semibold text-gray-700">Vacunas</h3>
                                <p class="text-gray-600">{{ selectedAnimal.historiaClinica.vacunas !== null ? selectedAnimal.historiaClinica.vacunas : 'No registra' }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">Descripción</h3>
                        <p class="text-gray-600">{{ selectedAnimal.descripcion }}</p>
                    </div>
                    <div class="mt-6">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">Observaciones Veterinaria</h3>
                        <p class="text-gray-600">{{ selectedAnimal.historiaClinica.observaciones !== null ? selectedAnimal.observaciones : 'No registra'}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SearchIcon, PlusIcon,XIcon,Info,FilePenLine } from 'lucide-vue-next'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

useHead({
    title: 'Animales'
})

const searchTerm = ref('')
const showAddModal = ref(false)
const showDetailModal = ref(false)
const selectedAnimal = ref({})
const imagePreview = ref(null)
const animalsLoading  = ref(false);
//------------
const animales = ref([]);
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

await Promise.all([cargarAnimales()])

async function cargarAnimales() {
    animalsLoading.value = true;
    const { data, error } = await useAPI('/animal', { query: filtros.value })
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

function changePage(pageInfo) {
    filtros.value.page = pageInfo.page;
    console.log(pageInfo);
    cargarAnimales();
}
//------------------------------------------------- old

const animals = ref([
    { id: 1, name: 'Luna', species: 'Perro', breed: 'Labrador', birthDate: '2022-03', age: '2 años', color: 'Dorado', size: 'Grande', publishForAdoption: true, sterilized: true, vaccinated: true, vaccines: 'Rabia, Parvovirus', hasChip: true, character: 'Amigable', healthStatus: 'Excelente', image: '/placeholder.svg?height=300&width=300', description: 'Luna es una perra labrador muy cariñosa y juguetona. Le encanta nadar y jugar a buscar la pelota.', medicalRecord: 'Última revisión: 15/04/2024. Vacunas al día. Sin problemas de salud detectados.' },
    { id: 2, name: 'Max', species: 'Gato', breed: 'Siamés', birthDate: '2023-01', age: '1 año', color: 'Crema', size: 'Pequeño', publishForAdoption: false, sterilized: true, vaccinated: true, vaccines: 'Leucemia felina, Rabia', hasChip: false, character: 'Juguetón', healthStatus: 'Bueno', image: '/placeholder.svg?height=300&width=300', description: 'Max es un gato siamés muy activo y curioso. Le encanta explorar y jugar con juguetes interactivos.', medicalRecord: 'Última revisión: 10/03/2024. Vacunas al día. Ligera alergia alimentaria, dieta especial recomendada.' },
    { id: 3, name: 'Rocky', species: 'Perro', breed: 'Pastor Alemán', birthDate: '2019-05', age: '5 años', color: 'Negro y Marrón', size: 'Grande', publishForAdoption: false, sterilized: false, vaccinated: true, vaccines: 'Rabia, Moquillo', hasChip: true, character: 'Protector', healthStatus: 'En recuperación', image: '/placeholder.svg?height=300&width=300', description: 'Rocky es un perro pastor alemán leal y protector. Excelente como perro guardián y compañero de familia.', medicalRecord: 'Última revisión: 20/02/2024. En recuperación de una lesión en la pata trasera derecha. Tratamiento en curso.' },
    { id: 4, name: 'Mia', species: 'Gato', breed: 'Persa', birthDate: '2021-02', age: '3 años', color: 'Blanco', size: 'Mediano', publishForAdoption: true, sterilized: true, vaccinated: true, vaccines: 'Rabia, Panleucopenia', hasChip: false, character: 'Tranquila', healthStatus: 'Excelente', image: '/placeholder.svg?height=300&width=300', description: 'Mia es una gata persa muy tranquila y cariñosa. Le encanta que la cepillen y dormir en lugares cálidos.', medicalRecord: 'Última revisión: 05/05/2024. Vacunas al día. Requiere cepillado regular para evitar nudos en el pelaje.' },
    { id: 5, name: 'Toby', species: 'Perro', breed: 'Beagle', birthDate: '2023-09', age: '6 meses', color: 'Tricolor', size: 'Pequeño', publishForAdoption: true, sterilized: false, vaccinated: true, vaccines: 'Parvovirus', hasChip: false, character: 'Energético', healthStatus: 'Bueno', image: '/placeholder.svg?height=300&width=300', description: 'Toby es un cachorro beagle muy energético y juguetón. Adora los paseos y tiene un gran olfato.', medicalRecord: 'Última revisión: 01/04/2024. Vacunas al día. Próxima vacuna programada para el 01/07/2024.' },
])

const filteredAnimals = computed(() => {
    return animals.value.filter(animal =>
        animal.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        animal.species.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        animal.breed.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        animal.status.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        animal.color.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
})

const viewDetails = (animal) => {
    selectedAnimal.value = { ...animal }
    showDetailModal.value = true
}

const closeDetailModal = () => {
    showDetailModal.value = false
}

const editAnimal = (id) => {
    console.log(`Editar animal con ID: ${id}`)
    // Aquí iría la lógica para editar el animal
}
</script>