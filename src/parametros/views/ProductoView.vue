<template>
    <a-button type="primary" @click="handleNew">
        <FileAddOutlined />
    </a-button>
    <ParametroTable :dataSource="dataSourceTable" :columns="columns" :loading="TableDataLogin" :pagination="pagination"
        :ParamObject="ParamObject" :IsNew="IsNew" :getData="getParamsList" :getParam="getParam" :deleteParam="deleteParam"
        :ToogleModal="ToogleModal" dataUrl="producto" :clearForm="clearForm" :ToogleIsNew="ToogleIsNew">
    </ParametroTable>
    <ParametroForm :ParamObject="ParamObject" ModalTitle="Producto" :openModal="openModal"
        dataUrl="producto" :IsNew="IsNew" :loading="FormDataloading" :ToogleModal="ToogleModal" :getData="getParamsList"
        :addParam="addParam" :editParam="editParam">
        <template v-slot:ProductoFormContent>
            <a-form-item label="Producto" name="nombre">
                <a-input v-model:value="ParamObject.nombre" />
            </a-form-item>
        </template>
    </ParametroForm>
</template>
<script setup lang="ts">

import { ref, watch, onMounted, computed } from 'vue';
import { FileAddOutlined } from '@ant-design/icons-vue';
import ParametroTable from "@/parametros/components/ParametroTable.vue"
import ParametroForm from "@/parametros/components/ParametroForm.vue"
import { useParametros } from "@/parametros/composables/useParametros";
import { useParametro } from "@/parametros/composables/useParametro";
import { ColumnTable } from '../../informe/interfaces/informe';
import { Producto } from '@/shared/interfaces/sharedInterfaces';
const { dataSourceTable, TableDataError, TableDataLogin, total, current, pageSize, getParamsList,$reset } = useParametros();
const {IsNew,openModal, paramData, FormDataerror, FormDataloading, addParam, editParam, getParam, deleteParam } = useParametro();

const pagination = computed(() => ({
    total: total.value, // Total de registros en tu API
    current: current.value,
    pageSize: pageSize.value,
}));
const columns = ref<ColumnTable[]>([
    {
        title: 'Producto',
        dataIndex: 'nombre',
        sorter: true,
    },
    {
        title: 'Descripcion',
        dataIndex: 'descripcion',
        sorter: true,
    },
    {
        title: 'Accions',
        key: 'accions',
    }
]);

onMounted(async () => {
    $reset()
    await getParamsList("producto")
})

const ParamObject = ref<Producto>(null)

watch(
  () => paramData.value,
  () => {
    ParamObject.value=paramData.value as Producto
  }
);

const ToogleModal = (isOpen: boolean) => {
    openModal.value = isOpen;
};

const ToogleIsNew = (IsNewValue: boolean) => {
    IsNew.value = IsNewValue
};

const handleNew = () => {
    ToogleIsNew(true)
    clearForm()
    ToogleModal(true)
};

const clearForm = () => {
    ParamObject.value = {
        id:0,
        nombre: '',
        descripcion: ''
    }
};

</script>