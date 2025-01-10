<template>
    <div class="min-h-screen bg-orange-50 flex flex-col">
        <main class="flex-grow container mx-auto px-4 py-8">
            <h1 class="text-3xl font-bold text-orange-800 mb-8">Todos los Animales</h1>

            <div class="mb-6 flex justify-between items-center">
                <div class="relative">
                    <input type="text" v-model="searchTerm" placeholder="Buscar animales..."
                        class="pl-10 pr-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    <search-icon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-5 w-5" />
                </div>
                <button @click="openAddModal"
                    class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 flex items-center">
                    <plus-icon class="h-5 w-5 mr-2" />
                    Agregar Nuevo Animal
                </button>
            </div>

            <div class="bg-white rounded-lg shadow-md overflow-hidden overflow-x-auto">
                <table class="min-w-full divide-y divide-orange-200">
                    <thead class="bg-orange-100">
                        <tr>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                                Nombre</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                                Especie</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                                Raza</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                                Edad</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                                Color</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                                Tamaño</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                                Publicado</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                                Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-orange-200">
                        <tr v-for="animal in filteredAnimals" :key="animal.id" class="hover:bg-orange-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 h-10 w-10">
                                        <img class="h-10 w-10 rounded-full object-cover" :src="animal.image"
                                            :alt="animal.name" />
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">{{ animal.name }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ animal.species }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ animal.breed }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ animal.age }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ animal.color }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ animal.size }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span :class="[
                                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                    animal.publishForAdoption ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                ]">
                                    {{ animal.publishForAdoption ? 'Sí' : 'No' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button @click="viewDetails(animal)"
                                    class="text-orange-600 hover:text-orange-900 mr-3">Ver Detalles</button>
                                <button @click="editAnimal(animal.id)"
                                    class="text-indigo-600 hover:text-indigo-900">Editar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="filteredAnimals.length === 0" class="text-center py-8">
                <p class="text-gray-600">No se encontraron animales que coincidan con la búsqueda.</p>
            </div>
        </main>

        <!-- Modal para agregar nuevo animal -->
        <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <h2 class="text-2xl font-bold text-orange-800 mb-4">Agregar Nuevo Animal</h2>
                    <form @submit.prevent="addNewAnimal">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input type="text" id="name" v-model="newAnimal.name" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label for="species"
                                    class="block text-sm font-medium text-gray-700 mb-1">Especie</label>
                                <select id="species" v-model="newAnimal.species" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                    <option value="Perro">Perro</option>
                                    <option value="Gato">Gato</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                            <div>
                                <label for="breed" class="block text-sm font-medium text-gray-700 mb-1">Raza</label>
                                <input type="text" id="breed" v-model="newAnimal.breed" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label for="birthDate" class="block text-sm font-medium text-gray-700 mb-1">Fecha de
                                    Nacimiento</label>
                                <input type="month" id="birthDate" v-model="newAnimal.birthDate" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label for="color" class="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                <input type="text" id="color" v-model="newAnimal.color" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label for="size" class="block text-sm font-medium text-gray-700 mb-1">Tamaño</label>
                                <select id="size" v-model="newAnimal.size" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                    <option value="Pequeño">Pequeño</option>
                                    <option value="Mediano">Mediano</option>
                                    <option value="Grande">Grande</option>
                                </select>
                            </div>
                            <div>
                                <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                                <select id="status" v-model="newAnimal.status" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                    <option value="Disponible">Disponible</option>
                                    <option value="En tratamiento">En tratamiento</option>
                                    <option value="Adoptado">Adoptado</option>
                                </select>
                            </div>
                            <div>
                                <label for="sterilized"
                                    class="block text-sm font-medium text-gray-700 mb-1">Esterilizado</label>
                                <select id="sterilized" v-model="newAnimal.sterilized" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                    <option :value="true">Sí</option>
                                    <option :value="false">No</option>
                                </select>
                            </div>
                            <div>
                                <label for="vaccinated"
                                    class="block text-sm font-medium text-gray-700 mb-1">Vacunado</label>
                                <select id="vaccinated" v-model="newAnimal.vaccinated" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                    <option :value="true">Sí</option>
                                    <option :value="false">No</option>
                                </select>
                            </div>
                            <div v-if="newAnimal.vaccinated">
                                <label for="vaccines"
                                    class="block text-sm font-medium text-gray-700 mb-1">Vacunas</label>
                                <input type="text" id="vaccines" v-model="newAnimal.vaccines"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Ej: Rabia, Parvovirus, etc." />
                            </div>
                            <div>
                                <label for="chip" class="block text-sm font-medium text-gray-700 mb-1">Cuenta con
                                    chip</label>
                                <select id="chip" v-model="newAnimal.hasChip" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                    <option :value="true">Sí</option>
                                    <option :value="false">No</option>
                                </select>
                            </div>
                            <div>
                                <label for="character"
                                    class="block text-sm font-medium text-gray-700 mb-1">Carácter</label>
                                <input type="text" id="character" v-model="newAnimal.character" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label for="healthStatus" class="block text-sm font-medium text-gray-700 mb-1">Estado de
                                    Salud</label>
                                <input type="text" id="healthStatus" v-model="newAnimal.healthStatus" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label for="image" class="block text-sm font-medium text-gray-700 mb-1">Foto del
                                    Animal</label>
                                <input type="file" id="image" @change="handleImageUpload" accept="image/*"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div v-if="imagePreview" class="mt-2">
                                <img :src="imagePreview" alt="Vista previa de la imagen"
                                    class="max-w-full h-auto rounded-md" />
                            </div>
                        </div>
                        <div class="mb-4">
                            <label for="description"
                                class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea id="description" v-model="newAnimal.description" rows="3"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"></textarea>
                        </div>
                        <div class="mb-4">
                            <label for="medicalRecord" class="block text-sm font-medium text-gray-700 mb-1">Ficha
                                Veterinaria</label>
                            <textarea id="medicalRecord" v-model="newAnimal.medicalRecord" rows="3"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                placeholder="Ingrese información sobre vacunas, tratamientos, etc."></textarea>
                        </div>
                        <div class="flex justify-end space-x-3">
                            <button type="button" @click="closeAddModal"
                                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                                Cancelar
                            </button>
                            <button type="submit"
                                class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
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
                            <img :src="selectedAnimal.image" :alt="selectedAnimal.name"
                                class="w-full h-auto rounded-lg shadow-md" />
                        </div>
                        <div class="md:col-span-2">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Nombre</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.name }}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Especie</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.species }}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Raza</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.breed }}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Edad</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.age }}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Color</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.color }}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Tamaño</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.size }}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Publicado para Adopción</h3>
                                    <p :class="[
                                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                        selectedAnimal.publishForAdoption ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    ]">
                                        {{ selectedAnimal.publishForAdoption ? 'Sí' : 'No' }}
                                    </p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Esterilizado</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.sterilized ? 'Sí' : 'No' }}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Vacunado</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.vaccinated ? 'Sí' : 'No' }}</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700">Cuenta con chip</h3>
                                    <p class="text-gray-600">{{ selectedAnimal.hasChip ? 'Sí' : 'No' }}</p>
                                </div>
                            </div>
                            <div class="mt-4">
                                <h3 class="text-lg font-semibold text-gray-700">Carácter</h3>
                                <p class="text-gray-600">{{ selectedAnimal.character }}</p>
                            </div>
                            <div class="mt-4">
                                <h3 class="text-lg font-semibold text-gray-700">Estado de Salud</h3>
                                <p class="text-gray-600">{{ selectedAnimal.healthStatus }}</p>
                            </div>
                            <div v-if="selectedAnimal.vaccinated" class="mt-4">
                                <h3 class="text-lg font-semibold text-gray-700">Vacunas</h3>
                                <p class="text-gray-600">{{ selectedAnimal.vaccines }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">Descripción</h3>
                        <p class="text-gray-600">{{ selectedAnimal.description }}</p>
                    </div>
                    <div class="mt-6">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">Ficha Veterinaria</h3>
                        <p class="text-gray-600">{{ selectedAnimal.medicalRecord }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { PawPrintIcon, SearchIcon, PlusIcon,XIcon } from 'lucide-vue-next'

useHead({
    title: 'Animales'
})

const searchTerm = ref('')
const showAddModal = ref(false)
const showDetailModal = ref(false)
const selectedAnimal = ref({})
const imagePreview = ref(null)

const animals = ref([
    { id: 1, name: 'Luna', species: 'Perro', breed: 'Labrador', birthDate: '2022-03', age: '2 años', color: 'Dorado', size: 'Grande', publishForAdoption: true, sterilized: true, vaccinated: true, vaccines: 'Rabia, Parvovirus', hasChip: true, character: 'Amigable', healthStatus: 'Excelente', image: '/placeholder.svg?height=300&width=300', description: 'Luna es una perra labrador muy cariñosa y juguetona. Le encanta nadar y jugar a buscar la pelota.', medicalRecord: 'Última revisión: 15/04/2024. Vacunas al día. Sin problemas de salud detectados.' },
    { id: 2, name: 'Max', species: 'Gato', breed: 'Siamés', birthDate: '2023-01', age: '1 año', color: 'Crema', size: 'Pequeño', publishForAdoption: false, sterilized: true, vaccinated: true, vaccines: 'Leucemia felina, Rabia', hasChip: false, character: 'Juguetón', healthStatus: 'Bueno', image: '/placeholder.svg?height=300&width=300', description: 'Max es un gato siamés muy activo y curioso. Le encanta explorar y jugar con juguetes interactivos.', medicalRecord: 'Última revisión: 10/03/2024. Vacunas al día. Ligera alergia alimentaria, dieta especial recomendada.' },
    { id: 3, name: 'Rocky', species: 'Perro', breed: 'Pastor Alemán', birthDate: '2019-05', age: '5 años', color: 'Negro y Marrón', size: 'Grande', publishForAdoption: false, sterilized: false, vaccinated: true, vaccines: 'Rabia, Moquillo', hasChip: true, character: 'Protector', healthStatus: 'En recuperación', image: '/placeholder.svg?height=300&width=300', description: 'Rocky es un perro pastor alemán leal y protector. Excelente como perro guardián y compañero de familia.', medicalRecord: 'Última revisión: 20/02/2024. En recuperación de una lesión en la pata trasera derecha. Tratamiento en curso.' },
    { id: 4, name: 'Mia', species: 'Gato', breed: 'Persa', birthDate: '2021-02', age: '3 años', color: 'Blanco', size: 'Mediano', publishForAdoption: true, sterilized: true, vaccinated: true, vaccines: 'Rabia, Panleucopenia', hasChip: false, character: 'Tranquila', healthStatus: 'Excelente', image: '/placeholder.svg?height=300&width=300', description: 'Mia es una gata persa muy tranquila y cariñosa. Le encanta que la cepillen y dormir en lugares cálidos.', medicalRecord: 'Última revisión: 05/05/2024. Vacunas al día. Requiere cepillado regular para evitar nudos en el pelaje.' },
    { id: 5, name: 'Toby', species: 'Perro', breed: 'Beagle', birthDate: '2023-09', age: '6 meses', color: 'Tricolor', size: 'Pequeño', publishForAdoption: true, sterilized: false, vaccinated: true, vaccines: 'Parvovirus', hasChip: false, character: 'Energético', healthStatus: 'Bueno', image: '/placeholder.svg?height=300&width=300', description: 'Toby es un cachorro beagle muy energético y juguetón. Adora los paseos y tiene un gran olfato.', medicalRecord: 'Última revisión: 01/04/2024. Vacunas al día. Próxima vacuna programada para el 01/07/2024.' },
])

const newAnimal = ref({
    name: '',
    species: 'Perro',
    breed: '',
    birthDate: '',
    color: '',
    size: 'Mediano',
    status: 'Disponible',
    sterilized: false,
    vaccinated: false,
    vaccines: '',
    hasChip: false,
    character: '',
    healthStatus: '',
    description: '',
    medicalRecord: '',
    image: '/placeholder.svg?height=80&width=80'
})

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

const openAddModal = () => {
    showAddModal.value = true
}

const closeAddModal = () => {
    showAddModal.value = false
    resetNewAnimalForm()
}

const resetNewAnimalForm = () => {
    newAnimal.value = {
        name: '',
        species: 'Perro',
        breed: '',
        birthDate: '',
        color: '',
        size: 'Mediano',
        status: 'Disponible',
        sterilized: false,
        vaccinated: false,
        vaccines: '',
        hasChip: false,
        character: '',
        healthStatus: '',
        description: '',
        medicalRecord: '',
        image: '/placeholder.svg?height=80&width=80'
    }
    imagePreview.value = null
}

const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            newAnimal.value.image = e.target.result
            imagePreview.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const addNewAnimal = () => {
    const id = animals.value.length + 1
    const birthDate = new Date(newAnimal.value.birthDate)
    const age = calculateAge(birthDate)
    const animalToAdd = { ...newAnimal.value, id, age }
    animals.value.push(animalToAdd)
    closeAddModal()
    console.log('Nuevo animal agregado:', animalToAdd)
}

const calculateAge = (birthDate) => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }

    if (age === 0) {
        const monthsOld = monthDiff + 12
        return `${monthsOld} ${monthsOld === 1 ? 'mes' : 'meses'}`
    } else {
        return `${age} ${age === 1 ? 'año' : 'años'}`
    }
}
</script>