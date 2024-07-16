import clientsApi from '@/api/informe-api';
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useBienStore2 } from "@/stores/bien2";
import { message } from 'ant-design-vue';
import { Adjunto, Bien, TipoBienForm } from '../interfaces/informe';
import { TipoBien } from '@/shared/interfaces/sharedInterfaces';


export const useBien = () => {

    const BienStore = useBienStore2();
    const { $reset } = BienStore;
    const { dataSourceBien, fileList, loading, disableAdd, disableEdit, disableDelete } = storeToRefs(BienStore)

    const tiposBienesForm =ref<TipoBienForm[]>([]);
    const getBienParms = async (): Promise<void> => {
        try {
            const {data} = await clientsApi.get<TipoBien[]>(`/parametrosBien`);
            tiposBienesForm.value = [...data.map((tipo:TipoBien) => ({
                'value': tipo.nombre,
                'label': tipo.nombre,
                'key': tipo.id,
            }))] 
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
        }
    };

    const getBien = async (idBien: Number): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.get<Bien>(`/bien/${idBien}/edit`);
            dataSourceBien.value = data
            if (data.adjuntos.length > 0) {
                fileList.value = data.adjuntos.map((adjunto:Adjunto) => ({
                    uid: adjunto.id.toString(),
                    name: 'image.png',
                    status: 'done',
                    url: `http://acopio.test/storage/${adjunto.url}`,
                }))
            } else {
                fileList.value = []
            }
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
        }
    };

    const AddBien = async (IdInforme: number): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.post<number>('/bien', { descripcion: dataSourceBien.value.descripcion, tipobien_id: dataSourceBien.value.tipobien_id, informe_id: IdInforme })
            dataSourceBien.value.id = data
            disableAdd.value = false
            disableEdit.value = true
            disableDelete.value = true
            
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
            message.success(`El bien ha sido agregado al informe exitosamente`);
        }
    }
    const UpdateBien = async (IdInforme: number): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.put<number>(`/bien/${dataSourceBien.value.id}`, { descripcion: dataSourceBien.value.descripcion, tipo: dataSourceBien.value.tipobien_id, informe_id:IdInforme })
            disableAdd.value = false
            disableEdit.value = true
            disableDelete.value = true
            
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
            message.success(`El bien ha sido editado exitosamente`);
        }
    }

    const deleteBien = async (): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.delete<string>(`/bien/${dataSourceBien.value.id}`)
            ClearDataBien()
            disableAdd.value = true
            disableEdit.value = false
            disableDelete.value = false
            fileList.value=[];
            
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
            message.success(`El bien ha sido borrado del informe exitosamente`);
        }
    };

    const ClearDataBien = () => {
        dataSourceBien.value = {
            descripcion: '',
            tipobien_id: '',
            id: 0,
            tipobien:{
                id: 0,
                nombre: '',
                descripcion: '',
            },
            adjuntos: []
        }
    }


    return {
        getBienParms,
        getBien,
        AddBien,
        UpdateBien,
        deleteBien,
        ClearDataBien,
        $reset,
        dataSourceBien,
        fileList,
        loading,
        disableAdd,
        disableEdit,
        disableDelete,
        tiposBienesForm
    }
}