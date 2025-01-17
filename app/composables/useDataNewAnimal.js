// composables/useLocation.js

export const useEspecies = () =>
    useState('especies', () => []);

export const useRazas = () =>
    useState('razas', () => ({}));


export const useEstadosHC = () =>
    useState('estadosHC', () => [])

export const fetchEspecies = async () => {
    const especies = useEspecies();
    if (especies.value?.length === 0) {
        const { data } = await useAPI('/base-data/especies');
        especies.value = data; // Guardar los departamentos en el estado global
    }
};

export const fetchRazas = async (idEspecie) => {
    const razas = useRazas();
    
    if (!razas.value[idEspecie]) {
    
        const response  = await useAPI('/base-data/razas/especie/' + idEspecie);
        console.log(response);
        
        razas.value[idEspecie] = [...response.data.value];
    }
};

export const fetchEstadosHC = async () => {
    const estadosHC = useEstadosHC();
    if (estadosHC.value?.length === 0) {
        const { data } = await useAPI('/histo-clinic/estados');
        estadosHC.value = data.value; // Guardar los departamentos en el estado global
    }
}
