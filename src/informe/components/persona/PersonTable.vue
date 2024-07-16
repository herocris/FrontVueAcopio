<template>
    <a-table size="small" style="width: 100%" :dataSource="dataSourcePersons" :columns="columnsPersons"
        :loading="loading" :pagination='false' :customRow="(e) => {
            return {
                onClick: () => { clickRowTable(e) },        // click header row
            }
        }" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import { usePersonas } from "@/informe/composables/usePersonas";
import { usePersona } from "@/informe/composables/usePersona";
import { ColumnTable, Persona } from '../../interfaces/informe';

const { getPersons, dataSourcePersons, loading, disableAdd, disableEdit, disableDelete, } = usePersonas();
const { getPerson, dataSourcePerson, $reset } = usePersona();

interface Props {
    idInform: number;
    togleUploadvisible: Function;
};

const propsTable = defineProps<Props>();
onBeforeMount(async () => {
    $reset()
})
onMounted(async () => {
    $reset()
    await getPersons(propsTable.idInform);
})

const columnsPersons = ref<ColumnTable[]>([
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
    },
    {
        title: 'Identidad',
        dataIndex: 'identidad',
        key: 'identidad',
    },
]);

const clickRowTable = async (e: Persona) => {
    propsTable.togleUploadvisible(true)
    disableAdd.value = false
    disableDelete.value = true
    disableEdit.value = true

    if (dataSourcePerson.value.id !== e.id) {
        await getPerson(e.id)
    }
}

</script>