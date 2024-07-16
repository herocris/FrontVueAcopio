import { defineStore } from "pinia";
import { ref } from "vue";
import { AdjuntoForm, Bien } from '../informe/interfaces/informe';

export const useBienStore2 = defineStore('bien2', () => {

    const loading = ref<boolean>(false);

    const disableAdd = ref<boolean>(true)
    const disableEdit = ref<boolean>(false)
    const disableDelete = ref<boolean>(false)

    const tiposInf = ref([])
    const fileList = ref<AdjuntoForm[]>([])

    const dataSourceBiens = ref<Bien[]>([])
    const dataSourceBien = ref<Bien>(
        {
            descripcion: '',
            tipobien_id: '',
            tipobien:{
                id: 0,
                bienes: '',
                descripcion: '',
            },
            id: 0
        }
    );

    const $reset = () => {
        fileList.value=[]
        dataSourceBiens.value=[]
        dataSourceBien.value={
            descripcion: '',
            tipobien_id: '',
            tipobien:{
                id: 0,
                bienes: '',
                descripcion: '',
            },
            id: 0
        }
    };


    return {
        dataSourceBien,
        dataSourceBiens,
        disableAdd,
        disableEdit,
        disableDelete,
        tiposInf,
        loading,
        fileList,
        $reset
    }
})