import clientsApi from '@/api/informe-api';
import { storeToRefs } from "pinia";
import dayjs from 'dayjs';
import { message } from 'ant-design-vue';
import router from '@/router';
import { useInforme2Store } from "@/stores/informe2";
import { Informe, Adjunto } from '../interfaces/informe';
import { Ambito } from '../../shared/interfaces/sharedInterfaces';

export const useInforme = () => {

    const InformeStore = useInforme2Store();
    const { $reset } = InformeStore;
    const { loading, informe, fechas, adjuntosInf, ambitosSelect, ubicacionesInf } = storeToRefs(InformeStore)

    const getInform = async (idInforme: string): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.get<Informe>(`/informe/${idInforme}/edit`);
            const { id, titulo, expediente, producto_id, fechainicioevento, fechafinalevento, antecedente, situacionactual, observacion, ambitos, adjuntos } = data
            informe.value.id = id
            informe.value.titulo = titulo
            informe.value.expediente = expediente
            informe.value.producto_id = producto_id
            informe.value.fechas = [fechainicioevento.toString(), fechafinalevento.toString()]
            informe.value.antecedente = antecedente.descripcion
            informe.value.situacionactual = situacionactual
            informe.value.observacion = observacion.descripcion
            informe.value.ambitos = ambitos.map((ambito: Ambito) => (ambito.nombre))

            if (adjuntos.length > 0) {
                adjuntosInf.value = adjuntos.map((adjunto: Adjunto) => ({
                    uid: adjunto.id.toString(),
                    name: adjunto.descripcion,
                    status: 'done',
                    url: `http://acopio.test/storage/${adjunto.url}`,
                }))
            } else {
                adjuntosInf.value = []
            }
        } catch (errorr) {
            console.error('Error cargando datos:', errorr);
        } finally {
            loading.value = false;
        }
    };
    const AddInform = async (): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.post<number>('/informe', informe.value);
            
            informe.value.id = data
            router.push(`/informs/${data}`)
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
            await message.success(`El informe con expediente ${informe.value.expediente} ha sido creado exitosamente`);
        }
    };
    const EditInform = async (): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.put<number>(`/informe/${informe.value.id}`, informe.value);
            
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
            await message.success(`El informe con expediente ${informe.value.expediente} ha sido editado exitosamente`);
        }
    };
    const DeleteInform = async (idInforme: number): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.delete<string>(`/informe/${idInforme}`);
            
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
            await message.success(`El informe con expediente ${informe.value.expediente} ha sido borrado exitosamente`);
        }
    };

    return {
        getInform,
        AddInform,
        EditInform,
        DeleteInform,
        loading,
        informe,
        fechas,
        adjuntosInf,
        ambitosSelect,
        ubicacionesInf,
        $reset
    }
}