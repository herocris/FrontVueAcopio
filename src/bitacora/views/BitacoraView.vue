<template>
    <a-table :columns="columns" :row-key="(record: any) => record.id" :data-source="dataBitacoraTable"
        :pagination="pagination" :loading="loading" @change="handleTableChange">
        <template #bodyCell="{ column, text }">

            <template v-if="column.key === 'properties'">

                <span>
                    <a-typography-text v-if="text.hasOwnProperty('old')" type="danger">{{text?.old}}</a-typography-text>
                    <a-typography-text v-if="text.hasOwnProperty('attributes')" type="success">{{text?.attributes}}</a-typography-text>
                </span>

            </template>
        </template>
    </a-table>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { TableProps } from 'ant-design-vue';
import { ColumnTable } from '../../informe/interfaces/informe';
import { useBitacora } from '../composables/useBitacora';

const { getLogs, dataBitacoraTable, current, pageSize, sorterTable, totalRecords, loading } = useBitacora();


const pagination = computed(() => ({
    total: totalRecords.value, // Total de registros en tu API
    current: current.value,
    pageSize: pageSize.value,
}));

onMounted(async () => {
    await getLogs({ page: current.value, results: pageSize.value })
    console.log(dataBitacoraTable.value);
})
const columns = ref<ColumnTable[]>([
    {
        title: 'log_name',
        dataIndex: 'log_name',
        key: 'log_name',
        sorter: true
    },
    {
        title: 'description',
        dataIndex: 'description',
        key: 'description',
        sorter: true
    },
    {
        title: 'event',
        dataIndex: 'event',
        key: 'event',
        sorter: true
    },
    {
        title: 'properties',
        dataIndex: 'properties',
        key: 'properties',
        sorter: true
    },
    {
        title: 'formatted_date',
        dataIndex: 'formatted_date',
        key: 'formatted_date',
        sorter: true
    },

]);


const handleTableChange: TableProps['onChange'] = async (
  pag: { pageSize: number; current: number },
  filters: any,
  sorter: any,
) => {

  if (typeof sorter.column !== "undefined") {
    sorter.order = sorter.order == 'ascend' ? 'asc' : 'desc'
  }else{
    sorter.order ='desc'
    sorter.field='created_at'
  }
    await getLogs({ page: pag.current, results: pag.pageSize, sort_by: sorter.field, sort_by_order: sorter.order, filters: filters })
};


</script>