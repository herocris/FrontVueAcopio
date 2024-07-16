<template>
    <a-table :columns="propsTable.columns" :row-key="record => record.id" :data-source="propsTable.dataSource"
        :pagination="propsTable.pagination" :loading="propsTable.loading" @change="handleTableChange">
        <template #bodyCell="{ column, text }">
            <template v-if="column.key === 'accions'">
                <span>
                    <a-button size="small" type="link" @click="onEdit(text.id)">Edit</a-button>
                    <a-divider type="vertical" />
                    <a-popconfirm v-if="propsTable.dataSource" title="Sure to delete?" @confirm="handleDelete(text.id)">
                        <a-button danger size="small" type="link">Delete</a-button>
                    </a-popconfirm>
                </span>
            </template>
        </template>
    </a-table>
</template>
<script setup lang="ts">
import type { TableProps } from 'ant-design-vue';
import { ref, watch, onMounted, computed, Ref } from 'vue';
import { ColumnTable } from '../../informe/interfaces/informe';
import { Ambito, Producto, TipoBien } from '@/shared/interfaces/sharedInterfaces';

interface Props {
    ToogleIsNew: Function;
    ToogleModal: Function;
    clearForm: Function;
    getData: Function;
    getParam: Function;
    deleteParam: Function;
    dataSource: Ambito[] | Producto[] | TipoBien[];
    pagination: Object;
    columns: ColumnTable[];
    IsNew: Boolean;
    dataUrl: String;
    loading: Boolean
};

const propsTable = defineProps<Props>();

const handleTableChange: TableProps['onChange'] = async (
    pag: { pageSize: number; current: number },
    filters: any,
    sorter: any,
) => {
    if (typeof sorter.column !== "undefined") {
        sorter.order = sorter.order == 'ascend' ? 'asc' : 'desc'
    } else {
        sorter.order = 'asc'
        sorter.field = 'id'
    }
    await propsTable.getData(propsTable.dataUrl, { page: pag.current, results: pag.pageSize, sort_by: sorter.field, sort_by_order: sorter.order, filters: filters })
};

const onEdit = async (idParam: number) => {
    propsTable.ToogleIsNew(false)
    propsTable.clearForm()
    propsTable.ToogleModal(true)
    await propsTable.getParam(propsTable.dataUrl, idParam)
}

const handleDelete = async (id: number) => {
    await propsTable.deleteParam(propsTable.dataUrl, id)
    await propsTable.getData(propsTable.dataUrl)
};

</script>