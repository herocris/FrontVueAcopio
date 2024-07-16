import clientsApi from '@/api/informe-api';
import { ParametrosResponse } from '@/parametros/interfaces/parametro'
import { useParametroStore2 } from "@/stores/parametro";
import { storeToRefs } from 'pinia';
import { ParamsUrlgetData } from '../../shared/interfaces/sharedInterfaces';

export const useParametros = () => {
    const Parametros = useParametroStore2();
    const {$reset} = useParametroStore2();
    const { error, loading, dataSourceTable, total, current,pageSize, } = storeToRefs(Parametros)

    const getParamsList = async (url: string, params?: ParamsUrlgetData): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.get<ParametrosResponse>(url, { params });
            
            dataSourceTable.value = data.data;
            total.value = data.total
            current.value = data.current_page
            pageSize.value = data.per_page
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    };

    return { TableDataError:error, TableDataLogin:loading, dataSourceTable, total, current,pageSize, getParamsList,$reset };
};