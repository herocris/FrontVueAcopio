<template>
    <a-card style="width: 70%">
        <a-flex vertical justify="center" align="center" gap="small">
            <UploadImages tipo="bien" :fileList="fileList" @modelUpdateList="getBienes(propsForm.idInform)"
                :idmodel="dataSourceBien.id" :upvisible="uploadvisible" :nfiles=4 :loading="loading"
                @setValLoading="setValLoading" :idInforme="propsForm.idInform">
            </UploadImages>
            <a-form :disabled="loading" layout="horizontal" :model="dataSourceBien" autocomplete="off"
                @finish="onFinish" ref="formRef" :rules="rules">
                <a-form-item label="Descripción" name="descripcion">
                    <a-input v-model:value="dataSourceBien.descripcion" />
                </a-form-item>
                <a-form-item label="Tipo de bien" name="tipobien_id">
                    <a-select v-model:value="dataSourceBien.tipobien_id" style="width: 100%">
                        <a-select-option v-for="tipo in tiposBienesForm" :key="tipo.key">{{ tipo.value }}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-flex horizontal justify="center" align="center" gap="small">
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
        </a-flex>
    </a-card>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import UploadImages from "@/shared/componets/UploadImages.vue"
import { EditOutlined, SaveOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons-vue';
import { useBien } from "@/informe/composables/useBien";
import { useBienes } from "@/informe/composables/useBienes";
import type { Rule } from 'ant-design-vue/es/form';
import { Bien } from '../../interfaces/informe';

const { dataSourceBien, tiposBienesForm, fileList, loading, disableAdd, disableEdit, disableDelete, getBienParms, AddBien, UpdateBien, deleteBien } = useBien();
const { getBienes } = useBienes();

interface Props {
    idInform: number;
    uploadvisible: boolean;
};
const propsForm = defineProps<Props>();

const uploadvisible = ref<boolean>(false)

onMounted(async () => {
    await getBienParms();
})

watch(
    () => propsForm.uploadvisible,
    () => {
        uploadvisible.value = propsForm.uploadvisible
    }
);
watch(
    () => dataSourceBien.value,
    () => {
        formRef.value.resetFields()
    }
);
const formRef = ref();
const onFinish = async (values: Bien) => {
    formRef.value
        .validate()
        .then(async () => {
            console.log('Success:', values);
            if (disableAdd.value) {
                await AddBien(propsForm.idInform)
                await getBienes(propsForm.idInform)
                uploadvisible.value = true
            } else {
                await UpdateBien(propsForm.idInform)
                await getBienes(propsForm.idInform)
            }
        })
        .catch(error => {
            console.log('error', error);
        });
};
const rules: Record<string, Rule[]> = {
    descripcion: [
        {
            required: true,
            message: 'El campo descripcion es requerido',
            trigger: 'change',
        },
    ],
    tipobien_id: [
        {
            required: true,
            message: 'El campo tipo de bien es requerido',
            trigger: 'change'
        },
    ],
};
const handleDelete = async () => {
    await deleteBien()
    await getBienes(propsForm.idInform)
    uploadvisible.value = false
}

const setValLoading = (loadingVal: boolean) => {
    loading.value = loadingVal
}

</script>