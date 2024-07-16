import { defineStore } from "pinia";
import { ref } from "vue";
import { Persona, AdjuntoForm } from '../informe/interfaces/informe';

export const usePersona2Store = defineStore('persona2', () => {

    const loading = ref<boolean>(false)
    
    const disableAdd = ref<boolean>(true)
    const disableEdit = ref<boolean>(false)
    const disableDelete = ref<boolean>(false)
    const fileList = ref<AdjuntoForm[]>([])
    
    const dataSourcePersons = ref<Persona[]>([])
    const dataSourcePerson = ref<Persona>(
        {
            nombre: '',
            identidad: '',
            id: 0
        }
    )

    const $reset = () => {
        fileList.value=[]
        dataSourcePersons.value=[]
        dataSourcePerson.value={
            nombre: '',
            identidad: '',
            id: 0
        }
    };

    return {
        dataSourcePerson,
        fileList,
        dataSourcePersons,
        loading,
        disableAdd,
        disableEdit,
        disableDelete,
        $reset
    }
})