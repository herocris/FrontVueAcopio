import clientsApi from '@/api/informe-api';
import { ref } from "vue";
import { message } from 'ant-design-vue';
import { Ubicacion } from '../interfaces/informe';

export const useUbicacion = () => {

    const ubicacionesInf = ref<Ubicacion[]>([]);
    const coord = ref<Ubicacion>(null)
    const loading = ref<Boolean>(false);
    const openModal = ref<Boolean>(false);
    const disableAdd = ref<Boolean>(true);
    const disableEdit = ref<Boolean>(false);
    const disableDelete = ref<Boolean>(false);

    const clickMarker = (ubicacion:Ubicacion) => {
        disableAdd.value = false
        disableEdit.value = true
        disableDelete.value = true
        coord.value = ubicacion
        openModal.value = true;
    }

    const ubicacionesList = async (id:number) => {
        loading.value = true;
        try {
            const { data } = await clientsApi.get(`/ubicacionesinforme/${id}`);
            ubicacionesInf.value = [...data.ubicaciones]
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
        }
    };
    
    const handleStore = async () => {
        loading.value = true;     
        try {
            const { data } = await clientsApi.post("/ubicaciones", coord.value);
            await ubicacionesList(data.ubicacion.informe_id)
            
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            openModal.value = false;
            loading.value = false;
            message.success(`La ubicación ha sido agregada al informe exitosamente`);
        }
    };

    const handleUpdate = async () => {        
        loading.value = true;
        try {
            const { data } = await clientsApi.put(`/ubicaciones/${coord.value.id}`, coord.value);
            await ubicacionesList(data.ubicacion.informe_id)
            
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            openModal.value = false;
            loading.value = false;
            message.success(`La ubicación ha sido editada exitosamente`);
        }
    };

    const handleDelete = async () => {
        loading.value = true;
        try {
            const { data } = await clientsApi.delete(`/ubicaciones/${coord.value.id}`);
            await ubicacionesList(data.ubicacion.informe_id)
            
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            openModal.value = false;
            loading.value = false;
            message.success(`La ubicación ha sido borrada del informe exitosamente`);
        }
    };

    return {
        ubicacionesList,
        handleStore,
        handleUpdate,
        handleDelete,
        clickMarker,
        coord,
        ubicacionesInf,
        openModal,
        loading,
        disableAdd,
        disableEdit,
        disableDelete
    }
}