<template>
    <a-table :dataSource="dataSourceBiens" :columns="columnsBiens" size="small" :loading="loading" :pagination='false'
        style="width: 100%" :customRow="(e) => {
            return {
                onClick: () => { clickRowTable(e) },        // click header row
            }
        }">
        <template #bodyCell="{ column, text }">
            <template v-if="column.key === 'nombre'">
                {{ text.tipobien.nombre }}
            </template>
        </template>
    </a-table>
</template>
<script setup lang="ts">
import { ref, onMounted,onBeforeMount } from 'vue';
import { useBienes } from "@/informe/composables/useBienes";
import { useBien } from "@/informe/composables/useBien";
import { Bien, ColumnTable } from '../../interfaces/informe';

const { getBienes, dataSourceBiens, loading, disableAdd, disableEdit, disableDelete, } = useBienes();
const { getBien, dataSourceBien,$reset } = useBien();

interface Props {
    idInform: number;
    togleUploadvisible: Function;
};

const propsTable = defineProps<Props>();
    onBeforeMount(async () => {
    $reset()
})
onMounted(async () => {
    await getBienes(propsTable.idInform);
})

const columnsBiens = ref<ColumnTable[]>([
    {
        title: 'Descripcion',
        dataIndex: 'descripcion',
        key: 'descripcion',
    },
    {
        title: 'Tipobien',
        key: 'nombre',
    },
]);

const clickRowTable = async (e:Bien) => {
    propsTable.togleUploadvisible(true)
    disableAdd.value = false
    disableDelete.value = true
    disableEdit.value = true

    if (dataSourceBien.value.id!==e.id) {
        await getBien(e.id)
    }
}
</script>