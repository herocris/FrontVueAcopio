<template>
    <a-button type="primary" @click="propsTable.handleNew">
        <FileAddOutlined />
    </a-button>
    <a-table :columns="columnsUser" :row-key="(record: any) => record.id" :data-source="propsTable.dataUserTable"
        :pagination="propsTable.pagination" :loading="propsTable.loading" @change="handleTableChange">
        <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'roles'">
                <span>
                    <a-tag v-for="tag in text" :key="tag" color='blue'>
                        {{ tag.name }}
                    </a-tag>
                </span>
            </template>
            <template v-if="column.key === 'accions'">
                <span>
                    <a-button size="small" type="link" @click="propsTable.onEdit(text.id)">Edit</a-button>
                    <a-divider type="vertical" />
                    <a-popconfirm v-if="propsTable.dataUserTable.length" title="Sure to delete?"
                        @confirm="propsTable.handleDelete(text.id)">
                        <a-button danger size="small" type="link">Delete</a-button>
                    </a-popconfirm>
                </span>
            </template>
        </template>
    </a-table>
</template>
<script setup lang="ts">
import type { TableProps } from 'ant-design-vue';
import { ref, computed, onMounted } from 'vue';
import { FileAddOutlined } from '@ant-design/icons-vue';
import { ColumnTable } from '../../informe/interfaces/informe';
import { User } from '../interfaces/user';
import { useUserParams } from "@/usuario/composables/useUserParams";

const { getUserParams, tableParameterRoles } = useUserParams();

onMounted(async () => {
    await getUserParams('table')
    columnsUser.value[2].filters = tableParameterRoles.value
})
interface PropsUserTable {
    onEdit: Function;
    handleNew: Function;
    dataUserTable: User[];
    handleDelete: Function;
    getUsersData: Function;
    pagination: Object;
    loading: boolean
};

const propsTable = defineProps<PropsUserTable>();

const columnsUser = ref<ColumnTable[]>([
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        sorter: true
    },
    {
        title: 'Correo',
        dataIndex: 'email',
        key: 'email',
        sorter: true
    },
    {
        title: 'Roles',
        dataIndex: 'roles',
        filters: tableParameterRoles.value,
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
    };
    await propsTable.getUsersData({ page: pag.current, results: pag.pageSize, sort_by: sorter.field, sort_by_order: sorter.order, filters: filters })
};


</script>