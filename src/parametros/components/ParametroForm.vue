<template>
    <a-modal v-model:open="openModal" :title="propsForm.ModalTitle"
        @cancel="propsForm.ToogleModal(false); formRef.resetFields()" :footer="null">
        <a-form :disabled="propsForm.loading" :label-col="labelCol" :wrapper-col="wrapperCol" layout="horizontal"
            style="max-width: 100%" ref="formRef" :model="propsForm.ParamObject" @finish="onFinish" :rules="rules">
            <slot name="AmbitoFormContent"></slot>
            <slot name="ProductoFormContent"></slot>
            <slot name="TipoBienFormContent"></slot>
            <a-form-item label="Descripcion" name="descripcion">
                <a-input v-model:value="propsForm.ParamObject.descripcion" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit" :loading="loading" v-if="propsForm.IsNew">
                    <SaveOutlined />
                </a-button>
                <a-button type="primary" html-type="submit" :loading="loading" v-else>
                    <EditOutlined />
                </a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { EditOutlined, SaveOutlined } from '@ant-design/icons-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { Ambito, Producto, TipoBien } from '@/shared/interfaces/sharedInterfaces';

interface Props {
    ToogleModal: Function;
    addParam: Function;
    getData: Function;
    editParam: Function;
    ParamObject: Ambito | Producto | TipoBien;
    openModal: Boolean;
    dataUrl: string;
    IsNew: boolean;
    loading: boolean;
    ModalTitle: string
};

const propsForm = defineProps<Props>();

const openModal = ref(propsForm.openModal)

watch(
    () => propsForm.openModal,
    () => {
        openModal.value = propsForm.openModal;
    }
);

const labelCol = {
    style: {
        width: '150px',
    },
};
const wrapperCol = {
    span: 14,
};

const formRef = ref();
const onFinish = async (values) => {
    console.log('akhdlfkj');

    formRef.value
        .validate()
        .then(async () => {
            console.log('Success:', values);
            if (propsForm.IsNew) {
                await propsForm.addParam(propsForm.dataUrl, propsForm.ParamObject)
                await propsForm.getData(propsForm.dataUrl)
                await propsForm.ToogleModal(false)
                console.log('gruarda');
            } else {
                await propsForm.editParam(propsForm.dataUrl, propsForm.ParamObject.id, propsForm.ParamObject)
                await propsForm.getData(propsForm.dataUrl)
                await propsForm.ToogleModal(false)
                console.log('edita');
            }
            propsForm.ToogleModal(false)
        })
        .catch(error => {
            console.log('error', error);
        });
};

const rules: Record<string, Rule[]> = {
    nombre: [
        {
            required: true,
            message: 'El campo producto es requerido',
            trigger: 'change',
        },
    ],
    bienes: [
        {
            required: true,
            message: 'El campo bienes es requerido',
            trigger: 'change',
        },
    ],
    descripcion: [
        {
            required: true,
            message: 'El campo descripción es requerido',
            trigger: 'change'
        },
    ]
};
</script>