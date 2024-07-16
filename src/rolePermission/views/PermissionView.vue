<template>
  <RolePermissionTable dataUrl="permission" :onEdit="onEdit" :getData="getDataRolePermission"
    :handleDelete="handleDelete" :handleNew="handleNew" :dataSource="(dataRolePersmissionTable as Permission[])"
    :pagination="pagination" :loading="loading">
  </RolePermissionTable>
  <RolePermissionForm dataUrl="permission" :openModal="openModal" :RoleData="(PermissionParam as FormState)"
    :ToogleModal="ToogleModal" :IsNew="IsNew" :loading="loading" :addRolePermission="addRolePermission"
    :updateRolePermission=updateRolePermission :getDataRolePermission="getDataRolePermission">
    
  </RolePermissionForm>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRolesPermissions } from "@/rolePermission/composables/useRolesPermissions";
import { useRolePermission } from "@/rolePermission/composables/useRolePermission";
import { useParamsRolePersmission } from "@/rolePermission/composables/useParamsRolePersmission";
import { FormState } from '../interfaces/rolePermission';
import RolePermissionTable from '../components/RolePermissionTable.vue';
import RolePermissionForm from '../components/RolePermissionForm.vue';
import { Permission } from '@/shared/interfaces/sharedInterfaces';

const { getParamsRolesPermissions, RolesParams, PermissionsParams } = useParamsRolePersmission();
const { getDataRolePermission, dataRolePersmissionTable, sorterTable, current, pageSize, total } = useRolesPermissions();
const { getRolePermission, addRolePermission, updateRolePermission, updateRolePermissions, deleteRolePermission, ClearRolePermission, PermissionParam, loading,$reset } = useRolePermission();

const openModal = ref(false)
const IsNew = ref(false)

const pagination = computed(() => ({
  total: total.value, // Total de registros en tu API
  current: current.value,
  pageSize: pageSize.value,
}));


onMounted(async () => {
  $reset()
  current.value=1
  await getDataRolePermission('permission', { page: current.value, results: pageSize.value })
})

const onEdit = async (idParam: number) => {
  IsNew.value = false
  ClearRolePermission('permission')
  await getRolePermission('permission', idParam)
  openModal.value = true
}

const handleDelete = async (idUser: number) => {
  await deleteRolePermission('permission', idUser)
  await getDataRolePermission('permission', { page: current.value, results: pageSize.value })
};

const handleNew = async () => {
  ClearRolePermission('permission')
  IsNew.value = true
  openModal.value = true
};

const ToogleModal = (isOpen: boolean) => {
  openModal.value = isOpen;
};





</script>