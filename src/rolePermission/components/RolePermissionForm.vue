<template>
    <a-modal v-model:open="openModal" title="Formulario Rol" :footer="null"
        @cancel="propsForm.ToogleModal(false); formRef.resetFields()">
        <a-form :disabled="propsForm.loading" :label-col="labelCol" :wrapper-col="wrapperCol" layout="horizontal"
            style="max-width: 100%" :model="propsForm.RoleData" autocomplete="off" @finish="onFinish" ref="formRef"
            :rules="rules">
            <a-form-item label="Nombre" name="name" ref="name">
                <a-input v-model:value="propsForm.RoleData.name" />
            </a-form-item>
            <slot name="selectPermissions" :prop="propsForm.RoleData">            
            </slot>
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
<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { EditOutlined, SaveOutlined } from '@ant-design/icons-vue';
import { useParamsRolePersmission } from "@/rolePermission/composables/useParamsRolePersmission";
import type { Rule } from 'ant-design-vue/es/form';
import { FormState} from '../interfaces/rolePermission';

const { getParamsRolesPermissions, PermissionsParams } = useParamsRolePersmission();

interface PropsUserForm {
    dataUrl:string;
    openModal: boolean;
    RoleData: FormState;
    ToogleModal: Function;
    IsNew: boolean;
    loading: boolean;
    addRolePermission: Function;
    updateRolePermission: Function;
    getDataRolePermission: Function;
    handleChangeSelectRoles?:Function
    
    // UpdateRoles: Function;
    // UpdatePermissions: Function;
};

const propsForm = defineProps<PropsUserForm>();

const formRef = ref();
const openModal = ref(propsForm.openModal)
watch(
    () => propsForm.openModal,
    () => {
        openModal.value = propsForm.openModal
    }
)



const onFinish = async (values) => {
    formRef.value
        .validate()
        .then(async () => {
            console.log('Success:', values);
            if (propsForm.IsNew) {
                await propsForm.addRolePermission(propsForm.dataUrl,propsForm.RoleData)
                await propsForm.getDataRolePermission(propsForm.dataUrl)
                console.log('gruarda');
            } else {
                await propsForm.updateRolePermission(propsForm.dataUrl,propsForm.RoleData.id, propsForm.RoleData)
                await propsForm.getDataRolePermission(propsForm.dataUrl)
                console.log('edita');
            }
            propsForm.ToogleModal(false)
        })
        .catch(error => {
            console.log('error', error);
        });
};



const rules: Record<string, Rule[]> = {
    name: [
        {
            required: true,
            message: 'El campo nombre es requerido',
            trigger: 'change',
        },
    ]
};


const labelCol = {
    style: {
        width: '150px',
    },
};
const wrapperCol = {
    span: 14,
};

</script>