<template>
    <a-card style="width: 70%">
        <a-flex vertical justify="center" align="center" gap="small">
            <UploadImages tipo="persona" :fileList="fileList" :idmodel="dataSourcePerson.id"
                @setValLoading="setValLoading" @modelUpdateList="getPersons(propsForm.idInform)"
                :upvisible="uploadvisible" :nfiles=1 :loading="loading" :idInforme="propsForm.idInform">
            </UploadImages>
            <a-form :disabled="loading" layout="horizontal" :model="dataSourcePerson" autocomplete="off"
                @finish="onFinish" ref="formRef" :rules="rules">
                <a-form-item label="Nombre" name="nombre">
                    <a-input v-model:value="dataSourcePerson.nombre" />
                </a-form-item>
                <a-form-item label="Identidad" name="identidad">
                    <a-input v-model:value="dataSourcePerson.identidad" />
                </a-form-item>
                <a-flex horizontal justify="center" align="center" gap="small">
                    <a-button type="primary" html-type="submit" :loading="loading" v-if="disableAdd">
                        <SaveOutlined />
                    </a-button>
                    <a-button type="primary" html-type="submit" :loading="loading" v-if="disableEdit">
                        <EditOutlined />
                    </a-button>
                    <a-popconfirm v-if="disableDelete" title="Sure to delete?" @confirm="handleDelete">
                        <a-button type="primary" :loading="loading" danger>
                            <DeleteOutlined />
                        </a-button>
                    </a-popconfirm>
                </a-flex>
            </a-form>
        </a-flex>
    </a-card>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import UploadImages from "@/shared/componets/UploadImages.vue"
import { EditOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons-vue';

import { usePersona } from "@/informe/composables/usePersona";
import { usePersonas } from "@/informe/composables/usePersonas";
import { Persona } from '@/informe/interfaces/informe';
import type { Rule } from 'ant-design-vue/es/form';

const { dataSourcePerson, fileList, loading, disableAdd, disableEdit, disableDelete, AddPerson, UpdatePerson, deletePerson } = usePersona();
const { getPersons } = usePersonas();

interface Props {
    idInform: number;
    uploadvisible: boolean;
};
const propsForm = defineProps<Props>();
const uploadvisible = ref<boolean>(false)


watch(
    () => propsForm.uploadvisible,
    () => {
        uploadvisible.value = propsForm.uploadvisible
    }
);
watch(
    () => dataSourcePerson.value,
    () => {
        formRef.value.resetFields()
    }
);
const formRef = ref();
const onFinish = async (values: Persona) => {
    formRef.value
        .validate()
        .then(async () => {
            console.log('Success:', values);
            if (disableAdd.value) {
                await AddPerson(propsForm.idInform)
                await getPersons(propsForm.idInform)
                uploadvisible.value = true
            } else {
                await UpdatePerson(propsForm.idInform)
                await getPersons(propsForm.idInform)
            }
        })
        .catch(error => {
            console.log('error', error);
        });
};

const rules: Record<string, Rule[]> = {
    nombre: [
        {
            required: true,
            message: 'El campo nombre es requerido',
            trigger: 'change',
        },
    ],
    identidad: [
        {
            required: true,
            message: 'El campo identidad es requerido',
            trigger: 'change'
        },
    ],
};

const handleDelete = async () => {
    await deletePerson()
    await getPersons(propsForm.idInform)
    uploadvisible.value = false
}

const setValLoading = (loadingVal: boolean) => {
    loading.value = loadingVal
}

</script>