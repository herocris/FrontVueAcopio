import { ref } from "vue";
import clientsApi from '@/api/informe-api';
import { BitacoraData, Bitacora } from '../interfaces/bitacora';
import { ParamsUrlgetData } from '../../shared/interfaces/sharedInterfaces';

export const useBitacora = () => {

    const loading = ref<boolean>(false);

    const dataBitacoraTable = ref<Bitacora[]>([])

    const current = ref<number>(0);
    const pageSize = ref<number>(0); // O el tamaño de página deseado
    const totalRecords = ref<number>(0);
    const sorterTable = ref({});

    const $reset = () => {

    }

    const getLogs = async (params: ParamsUrlgetData): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.get<BitacoraData>('bitacora',{ params });
            console.log(data);
            dataBitacoraTable.value = data.data
            current.value = data.current_page
            pageSize.value = data.per_page
            totalRecords.value = data.total
            
        } catch (error) {
            console.log(error);
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
        }
    };

    return {
        getLogs,
        sorterTable,
        dataBitacoraTable,
        current,
        pageSize, 
        totalRecords,
        loading,
    }
}