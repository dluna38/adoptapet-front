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
                <data-table v-if="animales?.length !== 0" :value="animales" tableStyle="min-width: 50rem" paginator
                    :rows="page.tamano" :total-records="page.totalElements" @page="changePage">
                    <column field="nombre" header="Nombre"></column>
                    <column field="raza.especie.nombre" header="Especie"></column>
                    <column field="raza.nombre" header="Raza"></column>
                    <column field="sexo" header="Sexo"></column>
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
                    <column header="Acciones">
                        <template #body="slotProps">
                            <button @click="viewDetails(slotProps.data)"
                                class="text-orange-600 hover:text-orange-900 mr-3 rounded-md"
                                v-tooltip.top="'Ver detalles'">
                                <Info />
                            </button>
                            <button @click="editAnimal(slotProps.data)"
                                class="text-indigo-600 hover:text-indigo-900 mr-3" v-tooltip.top="'Editar animal'">
                                <FilePenLine />
                            </button>
                            <button @click="deleteAnimal(slotProps.data)" class="text-indigo-600 hover:text-indigo-900"
                                v-tooltip.top="'Borrar animal'">
                                <Trash2 color="red" />
                            </button>
                        </template>
                    </column>
                </data-table>
                <div v-else>
                    <p class="text-gray-600 text-center">No se encontraron animales registrados</p>
                </div>
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
                            <img :src="getAnimalImage(selectedAnimal.fotoPortada?.img)" :alt="selectedAnimal.nombre"
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
                                    <p class="text-gray-600">{{ getMonthsOrYearsFromNow(selectedAnimal.fechaNacimiento)
                                        }}</p>
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
                                    <p class="text-gray-600">{{ selectedAnimal.historiaClinica.estaEsterilizado ? 'Sí' :
                                        'No' }}
                                    </p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Vacunado</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.historiaClinica.estaVacunado ? 'Sí' :
                                        'No' }}</p>
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
                                <p class="text-gray-600">{{ selectedAnimal.historiaClinica.vacunas !== null ?
                                    selectedAnimal.historiaClinica.vacunas : 'No registra' }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">Descripción</h3>
                        <p class="text-gray-600">{{ selectedAnimal.descripcion }}</p>
                    </div>
                    <div class="mt-6">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">Observaciones Veterinaria</h3>
                        <p class="text-gray-600">{{ selectedAnimal.historiaClinica.observaciones !== null ?
                            selectedAnimal.observaciones : 'No registra'}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <CatLoader :loading="loader" />
    <Toast group="msgToast"/>
    <ConfirmDialog></ConfirmDialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SearchIcon, PlusIcon, XIcon, Info, FilePenLine, Trash2 } from 'lucide-vue-next'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useMsgToast } from '~/composables/useMsgToast';

useHead({
    title: 'Animales'
})

const searchTerm = ref('')
const showAddModal = ref(false)
const showDetailModal = ref(false)
const selectedAnimal = ref({})
const imagePreview = ref(null)
const animalsLoading = ref(false);
const loader = ref(false);
const confirm = useConfirm();
const toast = useToast();
//------------
const animales = ref([]);
const page = ref({
    actualPage: 0,
    totalPages: 0,
    tamano: 0,
    totalElements: 0
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

const viewDetails = (animal) => {
    selectedAnimal.value = { ...animal }
    showDetailModal.value = true
}

const closeDetailModal = () => {
    showDetailModal.value = false
}

const editAnimal = (animal) => {
    navigateTo("/administracion/animales/editar/"+animal.id)
}
const deleteAnimal = async (animal) => {
    confirm.require({
        message: '¿Estas seguro?',
        header: 'Eliminar animal',
        rejectLabel: 'Cancelar',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Borrar',
            severity: 'danger'
        },
        accept: async () => {
            loader.value = true;
            const response = await useAPI(`/animal/${animal.id}`, { method: 'DELETE' })
            

            if (response.status.value === "error") {
                console.log(response.error.value);
                msgToast.value = response.error.value;
                showToast();
                return
            }
            await cargarAnimales();
            loader.value = false;
            toast.add({ severity: 'success', summary: 'Registro eliminado', detail: 'Registro eliminado correctamente', life: 3000 });
        },
        reject: () => {

        }
    });

    // Aquí iría la lógica para eliminar el animal
}

onMounted(()=>{
    let msg = getMsgToast()
    if(msg){
        toast.add(msg)
        msg = null
    }
})

</script>