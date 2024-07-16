//import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { FormState } from '../rolePermission/interfaces/rolePermission';
import { Permission, Role } from "@/shared/interfaces/sharedInterfaces";

export const useRolePermissionStore = defineStore('rolepermission', () => {

    const loading = ref<boolean>(false);
    const disableAdd = ref<boolean>(true)
    const disableEdit = ref<boolean>(false)
    const disableDelete = ref<boolean>(false)
    const RoleParam = ref<FormState>({
        id: 0,
        name: '',
        permissions: [],
    });
    const PermissionParam = ref<FormState>({
        id: 0,
        name: '',
    });
    const dataRolePersmissionTable = ref<Role[] | Permission[]>([])
    const current = ref<number>(0);
    const pageSize = ref<number>(0); // O el tamaño de página deseado
    const total = ref<number>(0);
    const sorterTable = ref({});

    const $reset = async () => {
        console.log('hace reset');

        RoleParam.value = {
            id: 0,
            name: '',
            permissions: [],
        };
        PermissionParam.value = {
            id: 0,
            name: '',
        };
        dataRolePersmissionTable.value = []

        current.value = 0;
        pageSize.value = 0; // O el tamaño de página deseado
        total.value = 0;
    }

    return {
        $reset,
        RoleParam,
        PermissionParam,
        dataRolePersmissionTable,
        sorterTable,
        current,
        pageSize,
        total,
        loading,
        disableAdd,
        disableEdit,
        disableDelete
    }
})