<template>
    <div class="min-h-screen bg-orange-50 flex flex-col">
        <div class="bg-white rounded-lg shadow-md p-6 mx-auto my-4">
            <div class="p-6">
                <h2 class="text-2xl font-bold text-orange-800 mb-4">{{ props.forEdit ? 'Editar Animal':'Agregar Nuevo Animal' }}</h2>
                <Form v-slot="$form" :resolver="resolver" @submit="addNewAnimal" id="formAnimal"
                    :initial-values="formInitialValues">
                    <div class="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                            <input type="text" id="nombre" v-model="newAnimal.nombre" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                        </div>
                        <div>
                            <label for="sexo" class="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
                            <Select name="sexo" id="sexo" v-model="newAnimal.sexo" required small size="small"
                                placeholder="Selecciona uno"
                                :options="[{ nombre: 'Macho', code: 'M' }, { nombre: 'Hembra', code: 'H' }]" option-value="code"
                                option-label="nombre"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                            </Select>
                            <Message v-if="$form.sexo?.invalid" severity="error" size="small" variant="simple">{{
                                $form.sexo?.error?.message }}</Message>
                        </div>
                        <div>
                            <label for="especie" class="block text-sm font-medium text-gray-700 mb-1">Especie</label>
                            <Select name="especie" @change="changeRazas" id="especie" v-model="newAnimal.especie"
                                required small size="small" placeholder="Selecciona una" :options="especies"
                                option-value="id" option-label="nombre"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                            </Select>
                            <Message v-if="$form.especie?.invalid" severity="error" size="small" variant="simple">{{
                                $form.especie?.error?.message }}</Message>
                        </div>
                        <div>
                            <label for="raza" class="block text-sm font-medium text-gray-700 mb-1">Raza</label>
                            <Select name="raza" v-model="newAnimal.raza" :options="razas[newAnimal.especie]"
                                :loading="loadingRazas" size="small" placeholder="Selecciona una" filter
                                option-label="nombre" option-value="id" empty-message="No hay razas disponibles"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                            </Select>
                            <Message v-if="$form.raza?.invalid" severity="error" size="small" variant="simple">{{
                                $form.raza?.error?.message }}</Message>
                        </div>
                        <div>
                            <label for="fechaNacimiento" class="block text-sm font-medium text-gray-700 mb-1">Fecha de
                                Nacimiento</label>
                            <DatePicker name="fechaNacimiento" v-model="newAnimal.fechaNacimiento" view="month"
                                dateFormat="mm/yy" :max-date="new Date()" />
                            <Message v-if="$form.fechaNacimiento?.invalid" severity="error" size="small"
                                variant="simple">{{ $form.fechaNacimiento?.error?.message }}</Message>
                        </div>
                        <div>
                            <label for="color" class="block text-sm font-medium text-gray-700 mb-1">Color</label>
                            <input type="text" id="color" v-model="newAnimal.color" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                        </div>
                        <div>
                            <label for="tamano" class="block text-sm font-medium text-gray-700 mb-1">Tamaño</label>
                            <select id="tamano" v-model="newAnimal.tamano" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                <option value="PEQUENO">Pequeño</option>
                                <option value="MEDIANO">Mediano</option>
                                <option value="GRANDE">Grande</option>
                            </select>
                        </div>
                        <div>
                            <label for="habilitadoAdopcion"
                                class="block text-sm font-medium text-gray-700 mb-1">Habilidado
                                adopcion</label>
                            <select id="habilitadoAdopcion" v-model="newAnimal.habilitadoAdopcion" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div>
                            <label for="estaEsterilizado"
                                class="block text-sm font-medium text-gray-700 mb-1">Esterilizado</label>
                            <select id="estaEsterilizado" v-model="newAnimal.estaEsterilizado" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                <option :value="true">Sí</option>
                                <option :value="false">No</option>
                            </select>
                        </div>
                        <div>
                            <label for="vacunas" class="block text-sm font-medium text-gray-700 mb-1">Vacunado</label>
                            <select id="vacunas" v-model="newAnimal.estaVacunado" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                <option :value="true">Sí</option>
                                <option :value="false">No</option>
                            </select>
                        </div>
                        <div v-if="newAnimal.estaVacunado">
                            <label for="vacunas" class="block text-sm font-medium text-gray-700 mb-1">Vacunas</label>
                            <input type="text" id="vacunas" v-model="newAnimal.vacunas"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                placeholder="Ej: Rabia, Parvovirus, etc." />
                        </div>
                        <div>
                            <label for="chip" class="block text-sm font-medium text-gray-700 mb-1">Cuenta con
                                chip</label>
                            <select id="chip" v-model="newAnimal.tieneChip" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                <option :value="true">Sí</option>
                                <option :value="false">No</option>
                            </select>
                        </div>
                        <div>
                            <label for="comportamiento"
                                class="block text-sm font-medium text-gray-700 mb-1">Comportamiento</label>
                            <Select name="comportamiento" size="small" placeholder="Selecciona uno"
                                :options="estadosHC.ComportamientoAnimal" option-label="name" option-value="code"
                                v-model="newAnimal.comportamiento" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                <template #option="slotProps">
                                    <div v-tooltip.top="slotProps.option.description">{{ slotProps.option.name }}</div>
                                </template>
                            </Select>
                            <Message v-if="$form.comportamiento?.invalid" severity="error" size="small"
                                variant="simple">{{
                                    $form.comportamiento?.error?.message }}</Message>
                        </div>
                        <div>
                            <label for="condicionMedica" class="block text-sm font-medium text-gray-700 mb-1">Estado de
                                Salud</label>
                            <Select size="small" name="condicionMedica" placeholder="Selecciona uno"
                                :options="estadosHC.CondicionMedicaAnimal" option-label="name" option-value="code"
                                v-model="newAnimal.condicionMedica" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                <template #option="slotProps">
                                    <div v-tooltip.top="slotProps.option.description">{{ slotProps.option.name }}</div>
                                </template>
                            </Select>
                            <Message v-if="$form.condicionMedica?.invalid" severity="error" size="small"
                                variant="simple">{{
                                    $form.condicionMedica?.error?.message }}</Message>
                        </div>
                        <div>
                            <label for="necesidadesEspeciales"
                                class="block text-sm font-medium text-gray-700 mb-1">Necesidades
                                especiales</label>
                            <Select size="small" name="necesidadesEspeciales" placeholder="Selecciona uno"
                                :options="estadosHC.NecesidadEspecialAnimal" option-label="name" option-value="code"
                                v-model="newAnimal.necesidadesEspeciales" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                <template #option="slotProps">
                                    <div v-tooltip.top="slotProps.option.description">{{ slotProps.option.name }}</div>
                                </template>
                            </Select>
                            <Message v-if="$form.necesidadesEspeciales?.invalid" severity="error" size="small"
                                variant="simple">{{
                                    $form.necesidadesEspeciales?.error?.message }}</Message>
                        </div>
                        <div>
                            <label for="estadoGeneral" class="block text-sm font-medium text-gray-700 mb-1">Estado de
                                general</label>
                            <Select size="small" name="estadoGeneral" placeholder="Selecciona uno"
                                :options="estadosHC.EstadoGeneralAnimal" option-label="name" id="chip"
                                v-model="newAnimal.estadoGeneral" required option-value="code"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                <template #option="slotProps">
                                    <div v-tooltip.top="slotProps.option.description">{{ slotProps.option.name }}</div>
                                </template>
                            </Select>
                            <Message v-if="$form.estadoGeneral?.invalid" severity="error" size="small" variant="simple">
                                {{
                                    $form.estadoGeneral?.error?.message }}</Message>
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
                        <label for="descripcion"
                            class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea placeholder="Breve descripción del animal" id="descripcion"
                            v-model="newAnimal.descripcion" rows="3" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="observaciones" class="block text-sm font-medium text-gray-700 mb-1">Observación
                            Veterinaria</label>
                        <textarea id="observaciones" v-model="newAnimal.observaciones" rows="3"
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
                            {{ props.forEdit ? 'Actualizar':'Guardar' }}
                        </button>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="whitespace-pre-wrap">{{ $form }}</div>
                        <div class="whitespace-pre-wrap">{{ newAnimal }}</div>
                    </div>
                    
                </Form>
            </div>
        </div>
    </div>

    <Toast group="errorT" :pt="{
                closeButton: {
                    autofocus: false
                }
            }" />
</template>


<script setup>
import { fetchEstadosHC, useEspecies, useRazas, fetchRazas, fetchEspecies } from '~/composables/useDataNewAnimal'
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';
import { Form } from '@primevue/forms';
import { useToast } from 'primevue/usetoast';
const props = defineProps({
    forEdit: {
        type: Boolean,
        default: false
    }
})
const toast = useToast();
const formInitialValues = ref(null);
const especies = useEspecies();
const estadosHC = useEstadosHC();
const razas = useRazas();
const loadingRazas = ref(false);
const imagePreview = ref(null)
let fileAnimal = null
const oldAnimal = ref(null)

const fetchAnimal = async () => {
    if (props.forEdit) {
        const response = await useAPI("/animal/" + useRoute().params.id);
        console.log(response);
        oldAnimal.value = response.data.value
    }
}

function showToast(msg) {
    toast.add({ severity:  Severities.ERROR, summary: 'Error',detail: msg, life: 5000 ,group:'errorT'});
};

const changeRazas = async () => {
    loadingRazas.value = true;
    await fetchRazas(newAnimal.value.especie);
    loadingRazas.value = false;
}

const newAnimal = ref({
    nombre: '',
    sexo: 'M',
    especie: '-1',
    raza: '',
    fechaNacimiento: null,
    color: '',
    tamano: 'Mediano',
    habilitadoAdopcion: true,
    estaEsterilizado: false,
    estaVacunado: false,
    vacunas: '',
    tieneChip: false,
    comportamiento: '',
    condicionMedica: '',
    estadoGeneral: '',
    necesidadesEspeciales: '',
    descripcion: '',
    observaciones: '',
    image: '/placeholder.svg?height=80&width=80'
})

const handleImageUpload = (event) => {
    fileAnimal = event.target.files[0]
    if (fileAnimal) {
        const reader = new FileReader()
        reader.onload = (e) => {
            imagePreview.value = e.target.result
        }
        reader.readAsDataURL(fileAnimal)
    } else {
        fileAnimal=null
        imagePreview.value = null
    }
}

const addNewAnimal = async (e) => {
    if (!e.valid) {
        showToast('Errores en el formulario');
        return;
    }

    const animalToAdd = { ...newAnimal.value }
    animalToAdd.raza = { id: animalToAdd.raza }
    console.log(animalToAdd)

    const formData = new FormData()
    //formData.append('datos', JSON.stringify(animalToAdd))
    const jsonBlob = new Blob([JSON.stringify(animalToAdd)], { type: "application/json" });
    formData.append("datos", jsonBlob);
    if(fileAnimal){
        formData.append('fotos', fileAnimal, "imagen.jpg")
    }   
    console.log(Object.fromEntries(formData.entries()))

    setMsgToast(Severities.SUCCESS,'Actualizado','Animal actualizado correctamente')
    navigateTo('/administracion/animales')
    return
    let response = null
    if(props.forEdit){
        response = await useAPI('/animal/'+oldAnimal.value.id, {
            method: 'PUT',
            body: formData,
        })
    }else{
        response = await useAPI('/animal', {
            method: 'POST',
            body: formData,
        })
    }
    
    if (response.status.value === "error") {
        console.log(response.error.value);
        showToast(response.error.value);
        return
    }
    navigateTo('/administracion/animales')
}

const resolver = ({ values }) => {
    //console.log('validando');
    //console.log(values);
    const errors = {
        raza: [], especie: [], comportamiento: [], condicionMedica: [], necesidadesEspeciales: [],
        necesidadesEspeciales: [], estadoGeneral: [], fechaNacimiento: [], sexo: []
    };

    if (values.raza === undefined || values.raza?.length === 0 || values.raza === '') {
        errors.raza.push({ type: 'required', message: 'Elige una' });
    }
    if (values.especie === undefined || values.especie?.length === 0 || values.especie === '') {
        errors.especie.push({ type: 'required', message: 'Elige una' });
    }
    if (values.comportamiento === undefined || values.comportamiento?.length === 0 || values.comportamiento === '') {
        errors.comportamiento.push({ type: 'required', message: 'Elige uno' });
    }
    if (values.condicionMedica === undefined || values.condicionMedica?.length === 0 || values.condicionMedica === '') {
        errors.condicionMedica.push({ type: 'required', message: 'Elige una' });
    }
    if (values.necesidadesEspeciales === undefined || values.necesidadesEspeciales?.length === 0 || values.necesidadesEspeciales === '') {
        errors.necesidadesEspeciales.push({ type: 'required', message: 'Elige una' });
    }
    if (values.estadoGeneral === undefined || values.estadoGeneral?.length === 0 || values.estadoGeneral === '') {
        errors.estadoGeneral.push({ type: 'required', message: 'Elige uno' });
    }
    if (values.fechaNacimiento === undefined || values.fechaNacimiento === null) {
        errors.fechaNacimiento.push({ type: 'required', message: 'Elige un mes, se calculara la edad' });
    }

    return {
        errors
    };
};

await Promise.all([fetchEspecies(), fetchEstadosHC(), fetchAnimal()])
if(props.forEdit){ 
    newAnimal.value = {
        nombre: oldAnimal.value.nombre,
        sexo: oldAnimal.value.sexo,
        especie: oldAnimal.value.raza.especie.id,
        raza: oldAnimal.value.raza.id,
        fechaNacimiento: oldAnimal.value.fechaNacimiento,
        color: oldAnimal.value.color,
        tamano: oldAnimal.value.tamano,
        habilitadoAdopcion: oldAnimal.value.habilitadoAdopcion,
        estaEsterilizado: oldAnimal.value.historiaClinica.estaEsterilizado,
        estaVacunado: oldAnimal.value.historiaClinica.estaVacunado,
        vacunas: oldAnimal.value.historiaClinica.vacunas||'',
        tieneChip: oldAnimal.value.tieneChip,
        comportamiento: oldAnimal.value.historiaClinica.comportamiento,
        condicionMedica: oldAnimal.value.historiaClinica.condicionMedica,
        estadoGeneral: oldAnimal.value.historiaClinica.estadoGeneral,
        necesidadesEspeciales: oldAnimal.value.historiaClinica.necesidadesEspeciales,
        descripcion: oldAnimal.value.descripcion || '',
        observaciones: oldAnimal.value.historiaClinica.observaciones || '',
    };
    await changeRazas()
}
onBeforeMount(()=>{
    if(props.forEdit){
    }
    formInitialValues.value = newAnimal.value
})

</script>