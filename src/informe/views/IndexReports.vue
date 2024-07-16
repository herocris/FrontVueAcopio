<template>
  <a-table :columns="columns" :row-key="(record: any) => record.id" :data-source="dataSource" :pagination="pagination"
    :loading="loading" @change="handleTableChange">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'creador'">
        <span>
          {{ text.name }}
        </span>
      </template>
      <template v-if="column.dataIndex === 'ambitos'">
        <span>
          <a-tag v-for="tag in text" :key="tag" color='blue'>
            {{ tag.nombre }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'accions'">
        <span>
          <RouterLink :to="`/informs/${text.id}`">
            <a-button size="small" type="link">Edit</a-button>
          </RouterLink>
          <a-divider type="vertical" />
          <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(text.id)">
            <a-button danger size="small" type="link">Delete</a-button>
          </a-popconfirm>
        </span>
      </template>
      <template v-else-if="column.key === 'producto'">
        <span>
          <a-tag>
            {{ text.producto.nombre }}
          </a-tag>
        </span>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import type { TableProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { ref, computed, onMounted } from 'vue';

import { useInformes } from "@/informe/composables/useInformes";
import { useInforme } from "@/informe/composables/useInforme";
import { useParametrosInformes } from "@/informe/composables/useParametrosInformes";
import { ColumnTable } from "@/informe/interfaces/informe";

const { getInformsParameters, ProductTableParameters, AmbitosTableParameters } = useParametrosInformes();
const { getInforms, dataSource, totalRecords, current, pageSize, loading } = useInformes();
const { DeleteInform } = useInforme();
const pagination = computed(() => ({
  total: totalRecords.value, // Total de registros en tu API
  current: current.value,
  pageSize: pageSize.value,
}));

// Ejecutar la carga inicial de datos
onMounted(async () => {
  await getInforms({ page: current.value.valueOf(), results: pageSize.value });
  await getInformsParameters('table')
  columns.value[3].filters = ProductTableParameters.value
  columns.value[2].filters = AmbitosTableParameters.value
})
//columnas de tabla
const columns = ref<ColumnTable[]>([
  {
    title: 'Expediente',
    dataIndex: 'expediente',
    key: 'expediente',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Creador de informe',
    sorter: true,
    dataIndex: 'creador',
  },
  {
    title: 'Ambitos',
    dataIndex: 'ambitos',
    filters: AmbitosTableParameters.value,
  },
  {
    title: 'Producto',
    key: 'producto',
    filters: ProductTableParameters.value,
  },
  {
    title: 'Fecha',
    dataIndex: 'formatted_date',
    key: 'formatted_date',
    sorter: true,
  },
  {
    title: 'Accions',
    key: 'accions',
  },
]);

// Función para manejar el cambio de página, filtro o orden
const handleTableChange: TableProps['onChange'] = async (
  pag: { pageSize: number; current: number },
  filters: any,
  sorter: any,
) => {
  current.value = pag.current;
  if (typeof sorter.column !== "undefined") {
    sorter.order = sorter.order == 'ascend' ? 'asc' : 'desc'
  }else{
    sorter.order ='asc'
    sorter.field='id'
  }
  
  //getInforms({ page: pag.current, results: pag.pageSize, sorter: sorter, filters: filters });
  getInforms({ page: pag.current, results: pag.pageSize, sort_by: sorter.field, sort_by_order: sorter.order, filters: filters });
};
//funcion para borrar informes desde tabla
const onDelete = async (Id: number) => {
  await DeleteInform(Id)
  await getInforms({ page: current.value.valueOf(), results: pageSize.value });
};

</script>
<style scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
