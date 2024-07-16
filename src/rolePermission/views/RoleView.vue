<template>
  <RolePermissionTable dataUrl="role" :onEdit="onEdit" :getData="getDataRolePermission" :handleDelete="handleDelete"
    :handleNew="handleNew" :dataSource="(dataRolePersmissionTable as Role[])" :pagination="pagination"
    :loading="loading">
  </RolePermissionTable>
  <RolePermissionForm dataUrl="role" :openModal="openModal" :RoleData="(RoleParam as FormState)" :ToogleModal="ToogleModal"
    :IsNew="IsNew" :loading="loading" :addRolePermission="addRolePermission" :updateRolePermission=updateRolePermission
    :getDataRolePermission="getDataRolePermission" :handleChangeSelectRoles="handleChangeSelectRoles">
    <template v-slot:selectPermissions="prop">
      <a-form-item label="Permisos">
        <a-select v-model:value="prop.prop.permissions" mode="tags" style="width: 100%" placeholder="Permisos"
          :options="PermissionsParams" @change="handleChangeSelectRoles"></a-select>
      </a-form-item>
    </template>
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
import { Role } from '@/shared/interfaces/sharedInterfaces';

const { getParamsRolesPermissions, RolesParams, PermissionsParams } = useParamsRolePersmission();
const { getDataRolePermission, dataRolePersmissionTable, sorterTable, current, pageSize, total,$reset } = useRolesPermissions();
const { getRolePermission, addRolePermission, updateRolePermission, updateRolePermissions, deleteRolePermission, ClearRolePermission, RoleParam, PermissionParam, loading } = useRolePermission();

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
  await getDataRolePermission('role', { page: current.value, results: pageSize.value })
  await getParamsRolesPermissions()
})

const onEdit = async (idParam: number) => {
  IsNew.value = false
  ClearRolePermission('role')
  await getRolePermission('role', idParam)
  openModal.value = true
}

const handleDelete = async (idUser: number) => {
  await deleteRolePermission('role', idUser)
  await getDataRolePermission('role', { page: current.value, results: pageSize.value })
};

const handleNew = async () => {
  ClearRolePermission('role')
  IsNew.value = true
  openModal.value = true
};

const ToogleModal = (isOpen: boolean) => {
  openModal.value = isOpen;
};

const handleChangeSelectRoles = async () => {
  if (RoleParam.value.id) {
    await updateRolePermissions(RoleParam.value.id, RoleParam.value)
    await getDataRolePermission('role', { page: current.value, results: pageSize.value })
  }
};



</script>