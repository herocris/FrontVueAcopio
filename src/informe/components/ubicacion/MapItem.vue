<template>
    <GoogleMap :api-key=apiKeyGoogle disable="true" style="width: 100%; height: 500px;"
        :center="{ lat: 14.689247, lng: -86.044502 }" :zoom="7" @click="clickMap">
        <Marker v-for="ubicacion in ubicacionesInf"
            :options="{ position: { lat: ubicacion.latitud, lng: ubicacion.longitud } }" :key="ubicacion.id"
            @click.right="clickMarker(ubicacion as Ubicacion)">
            <InfoWindow>
                {{ ubicacion.descripcion }}
            </InfoWindow>
        </Marker>
    </GoogleMap>
    <a-modal v-model:open="openModal" title="Basic Modal" footer="">
        <a-form layout="horizontal" style="max-width: 100%" :model="coord" autocomplete="off" @finish="onFinish"
            ref="formRef" :rules="rules">
            <a-form-item label="Descripcion" name="descripcion">
                <a-input v-model:value="coord.descripcion" />
            </a-form-item>
            <a-flex  justify="flex-end" gap="small">
                <a-button type="primary" html-type="submit" :loading="loading" v-if="disableAdd">
                    <SaveOutlined />
                </a-button>
                <a-button type="primary" html-type="submit" :loading="loading" v-if="disableEdit">
                    <EditOutlined />
                </a-button>
                <a-popconfirm v-if="disableDelete" title="Sure to delete?" @confirm="handleDelete">
                    <a-button type="primary" :loading="loading" v-if="disableDelete" danger>
                        <DeleteOutlined />
                    </a-button>
                </a-popconfirm>
            </a-flex>
        </a-form>
    </a-modal>
</template>
<script setup lang="ts">
//import googleApiKey from '@/api/informe-api';
import { ref, watch, onMounted } from 'vue';
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'
import { useUbicacion } from "@/informe/composables/useUbicacion";
import { Ubicacion } from '@/informe/interfaces/informe';
import type { Rule } from 'ant-design-vue/es/form';
import { EditOutlined, SaveOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons-vue';
const apiKeyGoogle= import.meta.env.VITE_GOOGLE_API_KEY

const {
    ubicacionesInf,
    coord,
    openModal,
    loading,
    disableAdd,
    disableEdit,
    disableDelete,
    ubicacionesList,
    handleStore,
    handleUpdate,
    handleDelete,
    clickMarker
} = useUbicacion();

interface Props {
    infoId: number;
};
const ubicacionProps = defineProps<Props>();

onMounted(async () => {
    await ubicacionesList(ubicacionProps.infoId)
})

const formRef = ref();
watch(
    () => coord.value,
    () => {
        formRef.value?formRef.value.clearValidate():null
    }
);
const onFinish = async (values) => {
    formRef.value
        .validate()
        .then(async () => {
            if (disableAdd.value) {
                await handleStore()
            } else {
                await handleUpdate()
            }
            console.log('Success:', values);
        })
        .catch(error => {

            console.log('error', error);
        });
    formRef.value.clearValidate()
};
const rules: Record<string, Rule[]> = {
    descripcion: [
        {
            required: true,
            message: 'El campo descripcion es requerido',
            trigger: 'change',
        },
    ],
};
const clickMap = (e) => {
    disableAdd.value = true
    disableEdit.value = false
    disableDelete.value = false
    coord.value = {
        id: 0,
        latitud: 0,
        longitud: 0,
        descripcion: '',
        tipo: 0,
        informe_id: 0
    }
    coord.value.latitud = e.latLng.lat()
    coord.value.longitud = e.latLng.lng()
    coord.value.informe_id = ubicacionProps.infoId
    //console.log(coord.value);
    openModal.value = true;
}


</script>