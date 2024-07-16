import clientsApi from '@/api/informe-api';
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRolePermissionStore } from "@/stores/rolePermission";
import { storeToRefs } from 'pinia';
import { Permission, Role } from '@/shared/interfaces/sharedInterfaces';

export const useRolePermission = () => {
    const RolePermission = useRolePermissionStore();
    const { $reset } = useRolePermissionStore();
    const { RoleParam, PermissionParam, loading, disableAdd, disableEdit, disableDelete } = storeToRefs(RolePermission)

    const getRolePermission = async (url: string, idParam: number): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.get<Role | Permission>(`${url}/${idParam}/edit`);
            if (url == 'role') {
                const dataRole =  data as Role
                RoleParam.value.id = dataRole.id
                RoleParam.value.name = dataRole.name
                RoleParam.value.permissions = (dataRole.permissions).map((permission: Permission) => ({ 'value': permission.name }))
                console.log(data);
                
            } else if (url == 'permission') {
                const dataPermission =  data as Permission
                PermissionParam.value.id = dataPermission.id
                PermissionParam.value.name = dataPermission.name
            }
        } catch (e) {
            console.log(e);
        } finally {
            loading.value = false;
        }
    };
    const addRolePermission = async (url: string, params: object): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.post<Role | Permission>(url, params);
            
        } catch (e) {
            console.log(e);
        } finally {
            loading.value = false;
            message.success(`El rol o permiso ha sido creado exitosamente`);
        }
    };
    const updateRolePermission = async (url: string, idParam: number, params: object): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.put<Role | Permission>(`${url}/${idParam}`, params);
            
            console.log(data);
        } catch (e) {
            console.log(e);
        } finally {
            loading.value = false;
            message.success(`El rol o permiso ha sido editado exitosamente`);
        }
    };

    const updateRolePermissions = async (idParam: number, params: object): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.put<Role>(`role/${idParam}/updatePermissions`, params);
            
            //console.log(data);
        } catch (e) {
            console.log(e);
        } finally {
            loading.value = false;
            message.success(`Los persmisos del rol han sido actualizados exitosamente`);
        }
    };

    const deleteRolePermission = async (url: string, idParam: number): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.delete<Role | Permission>(`${url}/${idParam}`);
            
            //console.log(data);
        } catch (e) {
            console.log(e);
        } finally {
            loading.value = false;
            message.success(`El rol o permiso ha sido borrado exitosamente`);
        }
    };

    const ClearRolePermission = (param: string) => {
        if (param == 'role') {
            RoleParam.value = {
                id: 0,
                name: '',
            }
        } else {
            PermissionParam.value = {
                id: 0,
                name: '',
            }
        }

    }

    return {
        $reset,
        getRolePermission,
        addRolePermission,
        updateRolePermission,
        updateRolePermissions,
        deleteRolePermission,
        ClearRolePermission,
        RoleParam,
        PermissionParam,
        loading,
        disableAdd,
        disableEdit,
        disableDelete,
    };
};