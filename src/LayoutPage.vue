<!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

 -->
  <template>
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <user-outlined />
                <span>Formularios</span>
              </span>
            </template>
            <a-sub-menu key="sub4">
              <template #title>
                <span>
                  <FileSearchOutlined />
                  <span>Informes</span>
                </span>
              </template>
              <RouterLink to="/informs">
                <a-menu-item key="2">Ver</a-menu-item>
              </RouterLink>
  
              <a-menu-item key="3" @click="redirectToCreateInform">Crear</a-menu-item>
  
  
            </a-sub-menu>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <ContainerOutlined />
                <span>Parametros</span>
              </span>
            </template>
            <!-- <a-sub-menu key="sub4">
              <template #title>
                <span>
                  <user-outlined />
                  <span>Regionales</span>
                </span>
              </template>
              <a-menu-item key="3">Ver</a-menu-item>
              <a-menu-item key="4">Crear</a-menu-item>
            </a-sub-menu> -->
            <RouterLink to="/informs/parametros/ambito">
              <a-menu-item key="4"><RightCircleOutlined /><span>Ambitos</span></a-menu-item>
            </RouterLink>
            <RouterLink to="/informs/parametros/producto">
              <a-menu-item key="5"><RightCircleOutlined /><span>Productos</span></a-menu-item>
            </RouterLink>
            <RouterLink to="/informs/parametros/bien">
              <a-menu-item key="6"><RightCircleOutlined /><span>Tipos de Bienes</span></a-menu-item>
            </RouterLink>
  
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <template #title>
              <span>
                <ContainerOutlined />
                <span>Seguridad</span>
              </span>
            </template>
            <RouterLink :to="`/informs/parametrosadmin`">
              <a-menu-item key="7"><UserOutlined /><span>Usuarios</span></a-menu-item>
            </RouterLink>
            <RouterLink to="/informs/role">
              <a-menu-item key="8"><IdcardOutlined /><span>Roles</span></a-menu-item>
            </RouterLink>
            <RouterLink to="/informs/permission">
              <a-menu-item key="9"><UnorderedListOutlined /><span>Permisos</span></a-menu-item>
            </RouterLink>
            <RouterLink to="/informs/bitacora">
              <a-menu-item key="10"><CarryOutOutlined /><span>Bitacora</span></a-menu-item>
            </RouterLink>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0; text-align: end" theme="dark">
          <a-flex gap="large" justify="flex-end">
            <a-typography-text type="success">{{ userAuthenticated.name }}</a-typography-text>
            <a-button danger :loading="loading" @click="logoutUser"><LogoutOutlined /></a-button>
          </a-flex>
          
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item>
          </a-breadcrumb>
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <RouterView />
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </template>
  <script setup>
  import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    RightCircleOutlined,
    FileSearchOutlined,
    IdcardOutlined,
    UnorderedListOutlined,
    CarryOutOutlined,
    ContainerOutlined,
    TeamOutlined,
    FileOutlined,
  } from '@ant-design/icons-vue';
  import router from './router/index'
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { LogoutOutlined } from '@ant-design/icons-vue';
  import { useInforme2Store } from "./stores/informe2";
  import { useUserStore } from './stores/user';
  import { useAuthentication } from './usuario/composables/useAuthentication';
  
  const {logoutUser} = useAuthentication();
  const UserStore = useUserStore()
  const { userAuthenticated, loading } = storeToRefs(UserStore)
  const InformeStore = useInforme2Store();
  
  const collapsed = ref(false);
  const selectedKeys = ref(['1']);
  
  const redirectToCreateInform = () => {
    InformeStore.$reset()
    router.push('/informs/0')
  };
  
  </script>
  <style scoped>
  #components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
  
  .site-layout .site-layout-background {
    background: #fff;
  }
  
  [data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
  }
  </style>