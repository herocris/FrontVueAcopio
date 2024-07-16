//import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { computed } from "vue";
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import { message } from 'ant-design-vue';
import { useUserStore } from "@/stores/user";
import clientsApi from '@/api/informe-api';
import { FormState, User } from '../interfaces/user';
import { Permission, Role } from "@/shared/interfaces/sharedInterfaces";



export const useUser = () => {

    const UserStore = useUserStore();
    const { $reset } = UserStore;
    const { UserData, Roles, Permissions, loading, disableAdd, disableEdit, disableDelete } = storeToRefs(UserStore)

    const getUser = async (idParam:number): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.get<User>(`/user/${idParam}/edit`);
            UserData.value.id = data.id
            UserData.value.name = data.name
            UserData.value.email = data.email
            UserData.value.roles = data.roles.map((rol:Role) => ({ 'value': rol.name }))
            UserData.value.permissions = data.permissions.map((permission:Permission) => ({ 'value': permission.name }))
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
        }
    };

    const addUser = async (user:FormState): Promise<void> => {
        loading.value = true;
        try {
            const {data} = await clientsApi.post<User>('/user',  user );
            
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
            message.success(`El usuario ha sido creado exitosamente`);
        }
    };

    const UpdateUser = async (idParam:number, user:FormState): Promise<void> => {
        console.log(user);
        loading.value = true;
        try {
            const {data} = await clientsApi.put<User>(`/user/${idParam}`, user);
            
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
            message.success(`El usuario ha sido editado exitosamente`);
        }
    }

    const deleteUser = async (idUser:number): Promise<void> => {
        loading.value = true;
        try {
            const {data} = await clientsApi.delete<User>(`/user/${idUser}`);
            
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
            message.success(`El usuario ha sido borrado exitosamente`);
        }
    };

    const UpdateRoles = async (userId:FormState): Promise<void> => {
        loading.value = true;
        try {
            const {data} = await clientsApi.put<User>(`users/${userId.id}/roles`, userId);
            console.log(data);
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
        }
    }

    
    const UpdatePermissions = async (userId:FormState): Promise<void> => {
        loading.value = true;
        try {
            const {data} = await clientsApi.put<User>(`users/${userId.id}/permissions`, userId);
            console.log(data);
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
        }
    }


    const ClearDataUser = () => {
        UserData.value = {
            id: 0,
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            roles: [],
            permissions: []
        }
    }

    return {
        $reset,
        getUser,
        addUser,
        UpdateUser,
        deleteUser,
        UpdateRoles,
        UpdatePermissions,
        ClearDataUser,
        UserData,
        Roles,
        Permissions,
        loading,
        disableAdd,
        disableEdit,
        disableDelete
    }
}