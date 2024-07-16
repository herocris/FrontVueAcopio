//import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import { useUserStore } from "@/stores/user";
import clientsApi from '@/api/informe-api';
import router from '@/router';
import { message } from 'ant-design-vue';
import { FormLoginState, UsersData, User, IsAuthResponse } from '../interfaces/user';
import axios from "axios";

export const useAuthentication = () => {

    const UserStore = useUserStore();
    const { $reset } = UserStore;
    const { userAuthenticated, loading, isAuth } = storeToRefs(UserStore)
    

    const sessionApi = axios.create({
        baseURL: 'http://localhost:8000',
        withCredentials: true,
    });
    sessionApi.defaults.withXSRFToken = true;

    const loginUser = async (userData: FormLoginState): Promise<void> => {
        loading.value = true;
        try {
            await sessionApi.get('/sanctum/csrf-cookie')

            const { data } = await clientsApi.post<User>('login', userData );
            userAuthenticated.value.id = data.id
            userAuthenticated.value.name = data.name
            userAuthenticated.value.email = data.email
            isAuth.value = true
            message.success('Has ingresado correctamente');
            await router.push(`/informs`)
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
        }
    };

    const logoutUser = async (): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.post<User>('/logout');
            router.push('/')
            isAuth.value = false
            message.success('Has cerrardo sesión correctamente');
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
        }
    };

    const isAuthenticated = async (): Promise<void> => {
        loading.value = true;
        try {
            const { data } = await clientsApi.get<IsAuthResponse>('/isAuthenticated');
            isAuth.value=data.isAuth
            userAuthenticated.value.id = data.user.id
            userAuthenticated.value.name = data.user.name
            userAuthenticated.value.email = data.user.email
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            loading.value = false;
        }
    };

    return {
        loginUser,
        logoutUser,
        isAuthenticated,
        loading,
        isAuth
    }
}