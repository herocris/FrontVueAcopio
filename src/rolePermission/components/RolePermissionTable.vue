<template>
    <a-button type="primary" @click="propsTable.handleNew">
        <FileAddOutlined />
    </a-button>
    <a-table :columns="columnsRole" :row-key="record => record.id" :data-source="propsTable.dataSource"
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
import { ref, onMounted, watch } from 'vue';
import { FileAddOutlined } from '@ant-design/icons-vue';
import type { TableProps } from 'ant-design-vue';
import { PermissionParams } from '../interfaces/rolePermission';
import { ColumnTable } from '../../informe/interfaces/informe';
import { Permission, Role } from '@/shared/interfaces/sharedInterfaces';



interface Props {
    onEdit: Function;
    getData: Function;
    handleDelete: Function;
    handleNew:Function;
    dataSource: Role[] | Permission[];
    pagination: Object;
    loading: boolean;
    dataUrl: string;
};


const propsTable = defineProps<Props>();

const columnsRole = ref<ColumnTable[]>([
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        sorter: true
    },
    {
        title: 'Accions',
        key: 'accions',
    },

]);
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

</script>