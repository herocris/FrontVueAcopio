<template>
  <a-button type="primary" @click="handleNew">
    <FileAddOutlined />
  </a-button>
  <ParametroTable :dataSource="dataSourceTable" :columns="columns" :loading="TableDataLogin" :pagination="pagination"
    :IsNew="IsNew" :getData="getParamsList" :getParam="getParam" :deleteParam="deleteParam" :ToogleModal="ToogleModal"
    dataUrl="ambito" :clearForm="clearForm" :ToogleIsNew="ToogleIsNew">
  </ParametroTable>
  <ParametroForm :ParamObject="ParamObject" ModalTitle="Ambito" :openModal="openModal" dataUrl="ambito" :IsNew="IsNew"
    :loading="FormDataloading" :ToogleModal="ToogleModal" :getData="getParamsList" :addParam="addParam"
    :editParam="editParam">
    <template v-slot:AmbitoFormContent>
      <a-form-item label="Ambito" name="nombre">
        <a-input v-model:value="ParamObject.nombre" />
      </a-form-item>
    </template>
  </ParametroForm>
</template>
<script setup lang="ts">

import { ref, watch, onMounted, computed, Ref } from 'vue';
import { FileAddOutlined } from '@ant-design/icons-vue';
import ParametroTable from "@/parametros/components/ParametroTable.vue"
import ParametroForm from "@/parametros/components/ParametroForm.vue"
import { useParametros } from "@/parametros/composables/useParametros";
import { useParametro } from "@/parametros/composables/useParametro";
import { ColumnTable } from '../../informe/interfaces/informe';
import { Ambito } from '@/shared/interfaces/sharedInterfaces';
const { dataSourceTable, TableDataError, TableDataLogin, total, current, pageSize, getParamsList, $reset } = useParametros();
const { IsNew, openModal, paramData, FormDataerror, FormDataloading, addParam, editParam, getParam, deleteParam } = useParametro();

const pagination = computed(() => ({
  total: total.value, // Total de registros en tu API
  current: current.value,
  pageSize: pageSize.value,
}));

const columns = ref<ColumnTable[]>([
  {
    title: 'Ambito',
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
  await getParamsList("ambito")
})

const ParamObject = ref<Ambito>({
  id: 0,
  nombre: '',
  descripcion: ''
})
watch(
  () => paramData.value,
  () => {
    ParamObject.value = paramData.value as Ambito
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
  paramData.value = {
    id: 0,
    nombre: '',
    descripcion: ''
  }
};

</script>