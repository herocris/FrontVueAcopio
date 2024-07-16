//import './assets/main.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index'
import axios from 'axios';
import { useAuthentication } from './usuario/composables/useAuthentication';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
const app = createApp(App)

app.use(createPinia())
const isAuthenticated = useAuthentication()
await isAuthenticated.isAuthenticated()

app.use(router)
app.mount('#app')