import clientsApi from '@/api/informe-api';
import { message } from 'ant-design-vue';
import { useParametroStore2 } from "@/stores/parametro";

import { storeToRefs } from 'pinia';
import { Ambito, Producto } from '../../shared/interfaces/sharedInterfaces';
import { TipoBien } from '@/shared/interfaces/sharedInterfaces';

export const useParametro = () => {
    const Parametro = useParametroStore2();
    const { IsNew, openModal, error, loading, paramData } = storeToRefs(Parametro)

    const getParam = async (url: string, idParam:number): Promise<void> => {
        loading.value = true;
        try {
            const {data} = await clientsApi.get<Ambito | Producto | TipoBien>(`${url}/${idParam}/edit`);
            paramData.value = data
        } catch (e) {
            console.log(e);
        } finally {
            loading.value = false;
        }
    };
    const addParam = async (url: string, params:object): Promise<void> => {
        loading.value = true;
        try {
            const {data} = await clientsApi.post<Ambito | Producto | TipoBien>(url, params);
            
            paramData.value = data
        } catch (e) {
            console.log(e);
        } finally {
            loading.value = false;
            message.success(`El parametro ha sido agregado exitosamente`);
        }
    };
    const editParam = async (url: string, idParam:number, params:object): Promise<void> => {
        loading.value = true;
        try {
            const {data} =  await clientsApi.put<Ambito | Producto | TipoBien>(`${url}/${idParam}`, params);
            
            paramData.value = data
        } catch (e) {
            console.log(e);
        } finally {
            loading.value = false;
            message.success(`El parametro ha sido editado exitosamente`);
        }
    };

    const deleteParam = async (url: string, idParam:number): Promise<void> => {
        loading.value = true;
        try {
            const {data} = await clientsApi.delete<Ambito | Producto | TipoBien>(`${url}/${idParam}`);
            
            paramData.value = data
        } catch (e) {
            console.log(e);
        } finally {
            loading.value = false;
            message.success(`El parametro ha sido borrado exitosamente`);
        }
    };


    return { IsNew, openModal, FormDataerror:error, FormDataloading:loading, paramData, getParam, addParam, editParam, deleteParam };
};