import clientsApi from '@/api/informe-api';
import { ref } from "vue";
import { Adjunto, AdjuntoForm } from '../../informe/interfaces/informe';

export const useUpload = () => {

    const loading = ref<boolean>(false);

    const uploadFile = async (file:File,tipo:string,idmodel:number):Promise<AdjuntoForm[]> => {//colocar idmodelo
        console.log('llega a subir');
        const formData = new FormData();
        formData.append('tipo', tipo);
        formData.append('archivosper[]', file);
        formData.append('modelo_id', idmodel.toString());
        try {
            const {data} = await clientsApi.post<Adjunto[]>('/adjunto', formData)
            const ArchivoData:AdjuntoForm[]=data.map((adjunto:Adjunto) => ({
                uid: adjunto.id.toString(),
                name: 'image.png',
                status: 'done',
                url: `http://acopio.test/storage/${adjunto.url}`,
            }))
            console.log(data);
            return ArchivoData
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
        }
    };

    const deleteFile = async (file:AdjuntoForm): Promise<void> => {
        if (file.uid != '0') {
            loading.value = true;
            try {
                const {data} = await clientsApi.delete<string>(`/adjunto/${file.uid}`)
                console.log(data);
            } catch (error) {
                console.error('Error cargando datos:', error);
            } finally {
                loading.value = false;
            }
        }
    };


    return {
        uploadFile,
        deleteFile,
        loading,
    }
}