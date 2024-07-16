import { ref } from "vue";
import clientsApi from '@/api/informe-api';
import { PermissionParams } from '../interfaces/rolePermission';
import { Role } from "@/shared/interfaces/sharedInterfaces";

export const useParamsRolePersmission = () => {

    const RolesParams = ref<Role[]>([])
    const PermissionsParams = ref<PermissionParams[]>([])
    const loading = ref(false);

    const getParamsRolesPermissions = async () => {
        loading.value = true;
        try {
            const roles = await clientsApi.get('/role');
            RolesParams.value = [...roles.data.data.map((rol) => ({'value':rol.name}) )]

            const permissions = await clientsApi.get('/permission');
            PermissionsParams.value = [...permissions.data.data.map((permission) => ({ 'text': permission.name, 'value': permission.name }))]
        } catch (error) {
            console.log(error);
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
        }
    };

    return {
        getParamsRolesPermissions,
        RolesParams,
        PermissionsParams,
        loading
    }
}