//import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import { useUserStore } from "@/stores/user";
import clientsApi from '@/api/informe-api';
import { UsersData } from '../interfaces/user';
import { ParamsUrlgetData } from '../../shared/interfaces/sharedInterfaces';

export const useUsers = () => {

    const UserStore = useUserStore();
    const { $reset } = UserStore;
    const { dataUserTable,current,pageSize,totalRecords,sorterTable,loading } = storeToRefs(UserStore)

    const getUsersData = async (params: ParamsUrlgetData): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.get<UsersData>('/user',{ params });
            dataUserTable.value = data.data
            current.value = data.current_page
            pageSize.value = data.per_page
            totalRecords.value = data.total
            console.log(data);
        } catch (error) {
            console.log(error);
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
        }
    };

    return {
        getUsersData,
        sorterTable,
        dataUserTable,
        current,
        pageSize, 
        totalRecords,
        loading,
    }
}