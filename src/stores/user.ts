import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { computed } from "vue";
import router from '../router/index'
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import clientsApi from '@/api/informe-api';
import { UsersData, Role, Permission, User, RoleForm, PermissionForm, FormState } from '../usuario/interfaces/user';

export const useUserStore = defineStore('user', () => {

    const userAuthenticated = ref<User>({
        id:0,
        name:'',
        email:'',
    });
    const isAuth = ref<boolean>(false)
    const loading = ref<boolean>(false);
    const disableAdd = ref<boolean>(true)
    const disableEdit = ref<boolean>(false)
    const disableDelete = ref<boolean>(false)
    const UserData = ref<FormState>({
        id: 0,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles:[],
        permissions:[]
    });
    const dataUserTable = ref<User[]>([])
    const Roles = ref<RoleForm[]>([])
    const Permissions = ref<PermissionForm[]>([])


    const current = ref<number>(0);
    const pageSize = ref<number>(0); // O el tamaño de página deseado
    const totalRecords = ref<number>(0);
    const sorterTable = ref({});

    const $reset = () => {

    }

    return {
        $reset,
        UserData,
        dataUserTable,
        Roles,
        Permissions,
        sorterTable,
        current,
        pageSize,
        totalRecords,
        loading,
        disableAdd,
        disableEdit,
        disableDelete,
        userAuthenticated,
        isAuth
    }
})