import { ref } from "vue";
import clientsApi from '@/api/informe-api';
import { Permission, Role } from "@/shared/interfaces/sharedInterfaces";
import { RoleTableParameter } from "../interfaces/user";

export const useUserParams = () => {

    const tableParameterRoles = ref<RoleTableParameter[]>([])
    const Roles = ref<Role[]>([])
    const Permissions = ref<Permission[]>([])
    const loading = ref(false);

    const getUserParams = async (typeParameter: string) => {
        loading.value = true;
        try {
            const roles = await clientsApi.get('/role');
            if (typeParameter == 'table') {
                tableParameterRoles.value = [...roles.data.data.map((role) => ({ 'text': role.name, 'value': role.name }))]
            }else{
                Roles.value = [...roles.data.data.map((rol) => ({'value':rol.name}) )]
                //console.log(Roles.value);
                
                const permissions = await clientsApi.get('/permission');
                Permissions.value = [...permissions.data.data.map((permission) => ({'value':permission.name}) )]
                //console.log(Permissions.value);
            }
            

        } catch (error) {
            console.log(error);
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
        }
    };

    return {
        getUserParams,
        tableParameterRoles,
        Roles,
        Permissions,
        loading
    }
}