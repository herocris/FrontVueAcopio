import axios from 'axios';
import { message } from 'ant-design-vue';
//import router from '@/router';

const clientsApi = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});
clientsApi.defaults.withXSRFToken = true;

clientsApi.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  message.error(error.response.data.data);
  return Promise.reject(error.response.data);
});
//const googleApiKey = `${import.meta.env.VITE_GOOGLE_API_KEY}`

export default clientsApi;