import { createRouter, createWebHistory } from 'vue-router'
import { message } from 'ant-design-vue';
import LayoutPage from '@/LayoutPage.vue'
import LoginView from '@/usuario/views/LoginView.vue'
import { useUserStore } from '@/stores/user'

const requireAuth = async (to, from, next) => {
  const useUser = useUserStore()
  console.log(useUser.isAuth);
  if (useUser.isAuth) {
    next()
  } else {
    message.error('No estas autenticado para ingresar a esa ruta');
    next('/')
  }
};

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,

  },
  {
    path: '/',
    name: 'home',
    component: LayoutPage,
    beforeEnter: requireAuth,
    redirect: '/',
    children: [
      {
        path: '/informs',
        name: 'informs',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../informe/views/IndexReports.vue')
      },
      {
        path: '/informs/:id/edit',
        name: 'inform',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../informe/views/EditInforme.vue')
      },
      {
        path: '/informs/:id',
        name: 'inform',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../informe/views/EditInforme.vue')
      },
      {
        path: '/informs/role',
        name: 'role',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../rolePermission/views/RoleView.vue')

      },
      {
        path: '/informs/permission',
        name: 'persmission',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../rolePermission/views/PermissionView.vue')

      },
      {
        path: '/informs/parametros/ambito',
        name: 'ambitos',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../parametros/views/AmbitoView.vue')
      },
      {
        path: '/informs/parametros/producto',
        name: 'productos',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../parametros/views/ProductoView.vue')
      },
      {
        path: '/informs/parametros/bien',
        name: 'bienes',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../parametros/views/TipoBienView.vue')
      },
      {
        path: '/informs/parametrosadmin',
        name: 'parametrosadmin',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../usuario/views/UserView.vue')
      },
      {
        path: '/informs/bitacora',
        name: 'bitacora',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../bitacora/views/BitacoraView.vue')
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFoundPage.vue')
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


// router.beforeEach((to, from, next) => {
//   const isAuthenticated = useAuthentication()
//   const isAuth = isAuthenticated.isAuthenticated()

//   if (isAuth) {
//     return router.push({ name: 'login' });
//   }
//   return next();
// })

// const requireAuth = async (to, from, next) => {
//   const isAuthenticated = useAuthentication()
//   const isAuth = await isAuthenticated.isAuthenticated()
//   console.log('aksdgj');
//   if (isAuth) {
//     next('/')
//   } else {
//     next('/login')
//   }
// }

export default router
