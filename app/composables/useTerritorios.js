// composables/useLocation.js

export const useDepartamentos = () =>
    useState('departamentos', () => []); // Estado global para los departamentos

export const useMunicipios = () =>
    useState('municipios', () => ({})); // Estado global para los municipios (objeto por idDepartamento)

export const fetchDepartamentos = async () => {
    const departamentos = useDepartamentos();
    if (departamentos.value?.length === 0) {
        const { data } = await useAPI('/public/departamentos');
        departamentos.value = data; // Guardar los departamentos en el estado global
    }
};

export const fetchMunicipios = async (idDepartamento) => {
    const municipios = useMunicipios();
    
    if (!municipios.value[idDepartamento]) {
        console.log("loading mun: "+idDepartamento);
        const { data } = await useAPI('/public/municipios/dep/' + idDepartamento);
        
        municipios.value[idDepartamento] = [...data.value.municipios];
    }
};
