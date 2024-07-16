import clientsApi from '@/api/informe-api';
import { ref } from 'vue';
import { useRolePermissionStore } from "@/stores/rolePermission";
import { storeToRefs } from 'pinia';
import { RolePermssionResponse, PermissionParams } from '../interfaces/rolePermission';
import { ParamsUrlgetData } from '../../shared/interfaces/sharedInterfaces';


export const useRolesPermissions = () => {
    const { $reset } = useRolePermissionStore();
    const RolePermission = useRolePermissionStore();
    const { dataRolePersmissionTable, sorterTable, current, pageSize, total, loading } = storeToRefs(RolePermission)

    const getDataRolePermission = async (url: string, params: ParamsUrlgetData): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.get<RolePermssionResponse>(url, { params });
            console.log(data);
            
            dataRolePersmissionTable.value = data.data;

            total.value = data.total
            current.value = data.current_page
            pageSize.value = data.per_page
        } catch (e) {
            console.log(e)
        } finally {
            loading.value = false;
        }
    };

    return { $reset, getDataRolePermission, dataRolePersmissionTable, sorterTable, current, pageSize, total };
};