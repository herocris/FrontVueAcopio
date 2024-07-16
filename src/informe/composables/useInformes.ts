import clientsApi from '@/api/informe-api';

import { storeToRefs } from "pinia";
import { useInforme2Store } from "@/stores/informe2";
import { ParamsUrlgetData } from '../../shared/interfaces/sharedInterfaces';
import { Informes } from '../interfaces/informe';

export const useInformes = () => {

    const InformeStore = useInforme2Store();
    const { dataSource, totalRecords, current, pageSize, loading} = storeToRefs(InformeStore)

    const getInforms = async (params: ParamsUrlgetData): Promise<void> => {
        console.log(params);
        
        loading.value = true;
        try {
            const { data } = await clientsApi.get<Informes>('/informe', { params });

            dataSource.value = data.data
            pageSize.value = data.per_page
            totalRecords.value = data.total
        } catch (error) {
            console.error(error);
            
        } finally {
            loading.value = false;
        }
    };

    return {
        getInforms,
        dataSource,
        totalRecords,
        current,
        pageSize,
        loading
    }
}