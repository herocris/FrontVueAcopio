import clientsApi from '@/api/informe-api';
import { ref } from "vue";
import { message } from 'ant-design-vue';
import { storeToRefs } from "pinia";
import { usePersona2Store } from "@/stores/persona2";
import { Persona, Adjunto } from '../interfaces/informe';

export const usePersona = () => {

    const PersonaStore = usePersona2Store();
    const { $reset } = PersonaStore; 
    const { dataSourcePerson, fileList, loading, disableAdd, disableEdit, disableDelete } = storeToRefs(PersonaStore)

    const getPerson = async (idPersona: number): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.get<Persona>(`/persona/${idPersona}/edit`);
            dataSourcePerson.value = data
            if (dataSourcePerson.value.adjuntos.length > 0) {
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

    const AddPerson = async (IdInforme: number): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.post<number>('/persona', { nombre: dataSourcePerson.value.nombre, identidad: dataSourcePerson.value.identidad, informe_id: IdInforme })
            dataSourcePerson.value.id = data
            disableAdd.value = false
            disableEdit.value = true
            disableDelete.value = true
            
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
            message.success(`La persona ha sido agregada al informe exitosamente`);
        }
    }
    const UpdatePerson = async (IdInforme: number): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.put<number>(`/persona/${dataSourcePerson.value.id}`, { nombre: dataSourcePerson.value.nombre, identidad: dataSourcePerson.value.identidad, informe_id: IdInforme })
            disableAdd.value = false
            disableEdit.value = true
            disableDelete.value = true
            
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
            message.success(`La persona ha sido editada exitosamente`);
        }
    }

    const deletePerson = async (): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.delete<string>(`/persona/${dataSourcePerson.value.id}`)
            ClearDataPerson()
            disableAdd.value = true
            disableEdit.value = false
            disableDelete.value = false
            fileList.value=[]
            
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
            message.success(`La persona ha sido borrada del informe exitosamente`);
        }
    };

    const ClearDataPerson = () => {
        dataSourcePerson.value = {
            nombre: '',
            identidad: '',
            id: 0,
            adjuntos: []
        }
    }


    return {
        getPerson,
        AddPerson,
        UpdatePerson,
        deletePerson,
        ClearDataPerson,
        $reset,
        dataSourcePerson,
        fileList,
        loading,
        disableAdd,
        disableEdit,
        disableDelete
    }
}