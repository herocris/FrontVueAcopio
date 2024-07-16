<template>
    <AdminTable :onEdit="onEdit" :getUsersData="getUsersData" :handleDelete="handleDelete" :handleNew="handleNew" :dataUserTable="(dataUserTable as User[])" :pagination="pagination" :loading="loading">
    </AdminTable>
    <AdminForm :openModal="openModal" :UserData="UserData" :ToogleModal="ToogleModal" :addUser="addUser"
        :UpdateUser="UpdateUser" :getUsersData="getUsersData" :UpdateRoles="handleChangeSelectRoles"
        :UpdatePermissions="handleChangeSelectPermissions" :IsNew="IsNew" :loading="loading">
    </AdminForm>
</template>
<script lang="ts" setup>
import { ref,computed, onMounted } from 'vue';
import AdminTable from "@/usuario/components/UserTable.vue"
import AdminForm from "@/usuario/components/UserForm.vue"

import { useUsers } from "@/usuario/composables/useUsers";
import { useUser } from "@/usuario/composables/useUser";
import { User } from '../interfaces/user';

const { dataUserTable, loading, current, pageSize, totalRecords, getUsersData } = useUsers();
const { $reset, getUser, addUser, UpdateUser, deleteUser, ClearDataUser, UpdateRoles, UpdatePermissions, UserData, Roles, Permissions } = useUser();


const openModal = ref(false)
const IsNew = ref(false)

const pagination = computed(() => ({
    total: totalRecords.value, // Total de registros en tu API
    current: current.value,
    pageSize: pageSize.value,
}));


onMounted(async () => {
    await getUsersData({ page: current.value, results: pageSize.value })
    console.log(dataUserTable.value);
})

const onEdit = async (idParam:number) => {
    IsNew.value = false
    ClearDataUser()
    await getUser(idParam)
    openModal.value = true
}

const handleDelete = async (idUser:number) => {
    await deleteUser(idUser)
    await getUsersData({ page: current.value, results: pageSize.value })
};

const handleNew = async () => {
    ClearDataUser()
    IsNew.value = true
    openModal.value = true
};

const ToogleModal = (isOpen:boolean) => {
    openModal.value = isOpen;
};

const handleChangeSelectRoles = async () => {
    if (UserData.value.id) {
        await UpdateRoles(UserData.value)
        await getUsersData({ page: current.value, results: pageSize.value })
    }
};

const handleChangeSelectPermissions = async () => {
    if (UserData.value.id) {
        await UpdatePermissions(UserData.value)
        await getUsersData({ page: current.value, results: pageSize.value })
    }
};


</script>