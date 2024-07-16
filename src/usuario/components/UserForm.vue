<template>
    <a-modal v-model:open="openModal" title="Formulario usuario" :footer="null"
        @cancel="propsForm.ToogleModal(false); formRef.resetFields()">
        <a-form :disabled="propsForm.loading" :label-col="labelCol" :wrapper-col="wrapperCol" layout="horizontal"
            style="max-width: 100%" :model="propsForm.UserData" autocomplete="off" @finish="onFinish" ref="formRef"
            :rules="rules">
            <a-form-item label="Nombre" name="name" ref="name">
                <a-input v-model:value="propsForm.UserData.name" />
            </a-form-item>
            <a-form-item label="Correo" name="email">
                <a-input v-model:value="propsForm.UserData.email" />
            </a-form-item>
            <a-form-item label="Contraseña" name="password">
                <a-input-password v-model:value="propsForm.UserData.password" />
            </a-form-item>
            <a-form-item label="Confirmar contraseña" name="password_confirmation">
                <a-input-password v-model:value="propsForm.UserData.password_confirmation" />
            </a-form-item>
            <a-form-item label="Roles">
                <a-select v-model:value="propsForm.UserData.roles" mode="tags" style="width: 100%" placeholder="Roles"
                    :options="Roles" @change="propsForm.UpdateRoles"></a-select>
            </a-form-item>
            <a-form-item label="Permisos">
                <a-select v-model:value="propsForm.UserData.permissions" mode="tags" style="width: 100%"
                    placeholder="Permisos" :options="Permissions" @change="propsForm.UpdatePermissions"></a-select>
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
<script lang="ts" setup>
import { ref, watch, onMounted} from 'vue';
import { EditOutlined, SaveOutlined } from '@ant-design/icons-vue';
import { useUserParams } from "@/usuario/composables/useUserParams";
import { useFormValidation } from "@/usuario/composables/useFormValidation";
import { FormState } from '../interfaces/user';
import type { Rule } from 'ant-design-vue/es/form';

const { getUserParams, Roles, Permissions, } = useUserParams();
const { PasswordValidate, confirmationValidate, emailValidate } = useFormValidation();

interface PropsUserForm {
    openModal: boolean;
    UserData:FormState;
    ToogleModal: Function;
    IsNew: boolean;
    loading: boolean;
    addUser: Function;
    UpdateUser: Function;
    getUsersData: Function;
    UpdateRoles: Function;
    UpdatePermissions: Function;
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

onMounted(async () => {
    getUserParams('form')
})

const onFinish = async (values: FormState) => {
    formRef.value
        .validate()
        .then(async () => {
            console.log('Success:', values);
            if (propsForm.IsNew) {
                await propsForm.addUser(propsForm.UserData)
                await propsForm.getUsersData()
                console.log('gruarda');
            } else {
                await propsForm.UpdateUser(propsForm.UserData.id, propsForm.UserData)
                await propsForm.getUsersData()
                console.log('edita');
            }
            propsForm.ToogleModal(false)
        })
        .catch(error => {
            console.log('error', error);
        });
};

const validatePassword = async (_rule: Rule, value: string):Promise<any> => {
    return PasswordValidate(value,propsForm.UserData?.password?.length,propsForm.IsNew)
};

const validateConfirmation = async (_rule: Rule, value: string):Promise<any> => {
    return confirmationValidate(value,propsForm.UserData?.password,propsForm.IsNew)
};

const validateEmail = async (_rule: Rule, value: string):Promise<any> => {
    return emailValidate(value)
};

const rules: Record<string, Rule[]> = {
    name: [
        {
            required: true,
            message: 'El campo nombre es requerido',
            trigger: 'change',
        },
    ],
    email: [
        {
            required: true,
            validator: validateEmail,
            trigger: 'change'
        },
    ],
    password: [
        {
            required: true,
            validator: validatePassword,
            trigger: 'change'
        },
    ],
    password_confirmation: [
        {
            required: true,
            validator: validateConfirmation,
            trigger: 'change'
        },
    ],
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