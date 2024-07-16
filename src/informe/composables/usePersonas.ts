import clientsApi from '@/api/informe-api';
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { usePersona2Store } from "@/stores/persona2";
import { Persona } from '../interfaces/informe';

export const usePersonas = () => {

    const PersonaStore = usePersona2Store();
    const { dataSourcePersons,loading,disableAdd, disableEdit, disableDelete } = storeToRefs(PersonaStore)

    const getPersons = async (idInforme:number): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.get<Persona[]>(`/personasInforme/${idInforme}`);
            dataSourcePersons.value = data
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
        }
    };


    return {
        getPersons,
        dataSourcePersons,
        loading,
        disableAdd, 
        disableEdit, 
        disableDelete
    }
}