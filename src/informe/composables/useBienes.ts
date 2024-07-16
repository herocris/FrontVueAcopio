import clientsApi from '@/api/informe-api';
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useBienStore2 } from "@/stores/bien2";
import { Bien } from '../interfaces/informe';

export const useBienes = () => {

    const PersonaStore = useBienStore2();
    const { dataSourceBiens,loading,disableAdd, disableEdit, disableDelete } = storeToRefs(PersonaStore)

    const getBienes = async (id:number): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.get<Bien[]>(`/biensInforme/${id}`);
            dataSourceBiens.value = data
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
        }
    };


    return {
        getBienes,
        dataSourceBiens,
        loading,
        disableAdd, 
        disableEdit, 
        disableDelete
    }
}