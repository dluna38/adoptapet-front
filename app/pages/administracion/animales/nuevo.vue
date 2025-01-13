<template>
    <div class="min-h-screen bg-orange-50 flex flex-col">
        <div class="bg-white rounded-lg shadow-md p-6 mx-auto my-4">
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
                            <label for="species" class="block text-sm font-medium text-gray-700 mb-1">Especie</label>
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
                            <label for="vaccines" class="block text-sm font-medium text-gray-700 mb-1">Vacunas</label>
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
                            <label for="character" class="block text-sm font-medium text-gray-700 mb-1">Carácter</label>
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
                        <button type="button" @click="navigateTo('/administracion/animales')"
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
</template>


<script setup>
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

</script>