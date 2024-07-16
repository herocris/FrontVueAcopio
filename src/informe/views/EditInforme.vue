<template>
  <a-form :disabled="loading" :label-col="labelCol" :wrapper-col="wrapperCol" layout="horizontal"
    style="max-width: 100%" :model="informe" autocomplete="off" @finish="onFinish" ref="formRef" :rules="rules">

    <a-form-item label="Titulo" name="titulo">
      <a-input v-model:value="informe.titulo" />
    </a-form-item>

    <a-form-item label="Expediente" name="expediente">
      <a-input v-model:value="informe.expediente" />
    </a-form-item>

    <a-form-item label="Producto" name="producto_id">
      <a-select v-model:value="informe.producto_id">
        <a-select-option v-for="producto in ProductFormParameters" :key="producto.key">{{ producto.value
          }}</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="Fecha de inicio y final" name="fechas">
      <a-range-picker 
      v-model:value="informe.fechas" 
      show-time
      format="YYYY-MM-DD HH:mm:ss"
      value-format="YYYY-MM-DD HH:mm:ss" 
      style="width: 100%" />
    </a-form-item>

    <a-form-item label="Antecedentes" name="antecedente">
      <a-textarea :rows="4" v-model:value="informe.antecedente" />
    </a-form-item>

    <a-form-item label="Situación actual" name="situacionactual">
      <a-textarea :rows="4" v-model:value="informe.situacionactual" />
    </a-form-item>

    <a-form-item label="Observación" name="observacion">
      <a-textarea :rows="4" v-model:value="informe.observacion" />
    </a-form-item>

    <a-form-item label="Ambitos" name="ambitos">
      <a-select v-model:value="informe.ambitos" mode="tags" style="width: 100%" placeholder="Ambitos"
        :options="AmbitosFormParameters"></a-select>
    </a-form-item>

    <a-form-item label="Guardar generales">
      <a-button type="primary" html-type="submit" :loading="loading" >Guardar</a-button>
    </a-form-item>

    <a-collapse v-if="informe.id">
      <a-collapse-panel key="1" header="Ubicaciones">
        <MapItem :infoId=informe.id></MapItem>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="Personas">
        <PersonCollapse :idInform="informe.id"></PersonCollapse>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="Bienes">
        <BienCollapse :idInform="informe.id"></BienCollapse>
      </a-collapse-panel>
      <a-collapse-panel key="4" header="Adjuntos">
        <UploadImages tipo="informe" :fileList="adjuntosInf" :idmodel="informe.id" @setValLoading="setValLoading"
          @modelUpdateList="getInform(informe.id.toString())" :upvisible="true" :nfiles=5 :loading="loading">
        </UploadImages>
      </a-collapse-panel>
    </a-collapse>
  </a-form>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import UploadImages from "@/shared/componets/UploadImages.vue"
import MapItem from "@/informe/components/ubicacion/MapItem.vue"
import PersonCollapse from "@/informe/components/persona/PersonCollapse.vue"
import BienCollapse from "@/informe/components/bien/BienCollapse.vue"
import type { Rule } from 'ant-design-vue/es/form';
import { useInforme } from "@/informe/composables/useInforme";
import { useParametrosInformes } from "@/informe/composables/useParametrosInformes";

const { getInformsParameters, ProductFormParameters, AmbitosFormParameters } = useParametrosInformes();
const { getInform, AddInform, EditInform, $reset, loading, informe, fechas, adjuntosInf, ambitosSelect } = useInforme();

const route = useRoute();

onMounted(async () => {
  $reset()
  //carga inicial de parametros de selects de formulario
  await getInformsParameters('form');
  //carga inicial de informe seleccionado anteriormete en la grilla de informes, siempre y cuando no se elija crear
  if (route.params.id != '0') {
    await getInform(route.params.id.toString());
  }
})


//en caso de elegir la opcion crear informe, el objeto informe se resetea
watch(
  () => route.params.id,
  async newId => {
    if (newId == '0') {
      $reset()
    }
  }
)

const setValLoading = (loadingVal: boolean): void => {
  loading.value = loadingVal
}

const labelCol = {
  style: {
    width: '150px',
  },
};
const wrapperCol = {
  span: 14,
};


const formRef = ref();
//dependiendo de lo que se este haciendo el formulario edita o guarda un nuevo registro
const onFinish = async (values) => {
  formRef.value
    .validate()
    .then(async () => {
      if (route.params.id != '0') {
        await EditInform();
      } else {
        await AddInform();
      }
    })
    .catch(error => {
      console.log('error', error);
    });
};

const rules: Record<string, Rule[]> = {
  titulo: [
        {
            required: true,
            message: 'El campo titulo es requerido',
            trigger: 'change',
        },
    ],
    expediente: [
        {
            required: true,
            message: 'El campo expediente es requerido',
            trigger: 'change'
        },
    ],
    producto_id: [
        {
            required: true,
            message: 'El campo producto es requerido',
            trigger: 'change'
        },
    ],
    fechas: [
        {
            required: true,
            message: 'El campo fechas es requerido',
            trigger: 'change'
        },
    ],
    antecedente: [
        {
            required: true,
            message: 'El campo antecedente es requerido',
            trigger: 'change'
        },
    ],
    situacionactual: [
        {
            required: true,
            message: 'El campo situacionactual es requerido',
            trigger: 'change'
        },
    ],
    observacion: [
        {
            required: true,
            message: 'El campo observacion es requerido',
            trigger: 'change'
        },
    ],
    ambitos: [
        {
            required: true,
            message: 'El campo ambitos es requerido',
            trigger: 'change'
        },
    ],
};
</script>