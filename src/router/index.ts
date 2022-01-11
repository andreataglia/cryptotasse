import { createRouter, createWebHistory } from 'vue-router'
import DashboardHome from '../views/DashboardHome.vue'
import HostLogin from '../views/HostLogin.vue'
import Register from '../views/Register.vue'

const routes = [
    {
        path: '/',
        name: 'DashboardHome',
        component: DashboardHome,
    },
    {
        path: '/login',
        name: 'HostLogin',
        component: HostLogin,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
